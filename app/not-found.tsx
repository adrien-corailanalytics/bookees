import Image from "next/image";
import Link from "next/link";
import T from "@/components/T";
import { textes } from "@/content/textes";
import monogram from "@/public/brand/bk-rose.svg";

const t = textes.introuvable;

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <Image src={monogram} alt="" className="h-20 w-20" />
      <h1 className="titre-2 mt-6">{t.titre}</h1>
      <p className="mt-3">
        <T>{t.texte}</T>
      </p>
      <Link href="/" className="btn mt-8">
        {t.bouton}
      </Link>
    </div>
  );
}
