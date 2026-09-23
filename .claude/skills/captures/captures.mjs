// Captures d'écran pleine page (desktop 1440 px, mobile 375 px) via Chrome
// headless et le protocole DevTools, sans dépendance.
//
//   node .claude/skills/captures/captures.mjs <base-url> [--out <dossier>] <chemin>...
//   node .claude/skills/captures/captures.mjs http://localhost:3123 / /carte
//
// Pour chaque page et chaque format : un PNG, et une ligne de bilan
// (débordement horizontal, nombre de contenus provisoires, erreurs JS).
// Chrome : CHROME=<chemin> pour un autre navigateur que Google Chrome (macOS).

import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const outFlag = args.indexOf("--out");
const out = outFlag >= 0 ? args.splice(outFlag, 2)[1] : join(tmpdir(), "bookees-captures");
const [base, ...paths] = args;
if (!base || paths.length === 0) {
  console.error("usage : captures.mjs <base-url> [--out <dossier>] <chemin>...");
  process.exit(1);
}
mkdirSync(out, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "mobile", width: 375, height: 812, mobile: true },
];
const chrome = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9400 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(join(tmpdir(), "bookees-chrome-"));
const browser = spawn(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function devtools(pathname, method = "GET") {
  for (let i = 0; i < 50; i++) {
    try {
      return await (await fetch(`http://127.0.0.1:${port}${pathname}`, { method })).json();
    } catch {
      await sleep(200);
    }
  }
  throw new Error("Chrome ne répond pas");
}

async function capture(url, viewport, file) {
  const target = await devtools("/json/new?about:blank", "PUT");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const errors = [];
  let loaded;
  const loadedP = new Promise((r) => (loaded = r));
  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data);
    if (pending.has(msg.id)) pending.get(msg.id)(msg.result), pending.delete(msg.id);
    if (msg.method === "Page.loadEventFired") loaded();
    if (msg.method === "Runtime.exceptionThrown") errors.push(msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text);
    if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") errors.push(msg.params.args.map((a) => a.value ?? a.description).join(" "));
  };
  await new Promise((r) => (ws.onopen = r));
  const send = (method, params = {}) => new Promise((r) => (pending.set(++id, r), ws.send(JSON.stringify({ id, method, params }))));

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.mobile });
  await send("Page.navigate", { url });
  await Promise.race([loadedP, sleep(15000)]);
  await sleep(1500); // polices, tuiles de carte, pastille des brouillons

  const { result } = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `({
      height: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth - innerWidth,
      drafts: document.querySelectorAll(".brouillon, .demo").length,
      title: document.title,
    })`,
  });
  const info = result.value;
  await send("Emulation.setDeviceMetricsOverride", { width: viewport.width, height: Math.min(info.height, 8000), deviceScaleFactor: 1, mobile: viewport.mobile });
  await sleep(300);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(file, Buffer.from(shot.data, "base64"));
  ws.close();
  await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`); // répond en texte, pas en JSON
  return { ...info, errors };
}

let failed = false;
try {
  for (const path of paths) {
    for (const viewport of VIEWPORTS) {
      const file = join(out, `${path.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "accueil"}-${viewport.name}.png`);
      const r = await capture(new URL(path, base).href, viewport, file);
      const problems = [r.overflow > 0 && `déborde de ${r.overflow}px`, r.errors.length > 0 && `${r.errors.length} erreur(s) JS : ${r.errors.join(" | ")}`].filter(Boolean);
      if (problems.length) failed = true;
      console.log(`${problems.length ? "✖" : "✔"} ${path} [${viewport.name}] « ${r.title} » — ${r.drafts} provisoire(s)${problems.length ? " — " + problems.join(" ; ") : ""}\n  ${file}`);
    }
  }
} finally {
  browser.kill();
}
process.exit(failed ? 1 : 0);
