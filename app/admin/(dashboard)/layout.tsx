import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-espresso/10 bg-espresso">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-serif text-lg font-semibold text-cream">
              Agorabica — Admin
            </Link>
            <Link href="/admin/evenements/nouveau" className="text-sm text-cream/80 hover:text-cream">
              + Nouvel événement
            </Link>
            <Link href="/admin/ressources" className="text-sm text-cream/80 hover:text-cream">
              Ressourcerie
            </Link>
            <Link href="/admin/lieux" className="text-sm text-cream/80 hover:text-cream">
              Lieux
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-cream/70 hover:text-cream">
              Voir le site ↗
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
