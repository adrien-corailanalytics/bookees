import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <p className="font-serif text-6xl text-brick">404</p>
      <h1 className="mt-4 font-serif text-2xl text-espresso">Cette page n&rsquo;existe pas.</h1>
      <p className="mt-2 text-espresso/70">
        Elle a peut-être été déplacée, ou l&rsquo;événement n&rsquo;est plus disponible.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Retour à l&rsquo;accueil
      </Link>
    </div>
  );
}
