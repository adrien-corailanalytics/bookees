import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité & RGPD",
  description: "Politique de confidentialité d'Agorabica : quelles données, pourquoi, combien de temps.",
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-serif text-4xl text-espresso">Confidentialité & RGPD</h1>
      <p className="mt-3 text-sm text-espresso/60">Dernière mise à jour : août 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-espresso/85">
        <section>
          <h2 className="font-serif text-xl text-espresso">Quelles données collectons-nous ?</h2>
          <p className="mt-2">
            Lorsque vous vous inscrivez à un événement : prénom, nom, email, et éventuellement si
            c&rsquo;est votre première fois chez Agorabica et comment vous nous avez connus.
            Lorsque vous rejoignez la newsletter : votre email. Lorsque vous votez à une question
            &laquo;&nbsp;Avant / Après&nbsp;&raquo; : un identifiant anonyme généré sur votre
            appareil, sans lien avec votre identité.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso">Pourquoi ?</h2>
          <p className="mt-2">
            Uniquement pour gérer votre inscription (confirmation, gestion des places et de la
            liste d&rsquo;attente, email de rappel) et, si vous l&rsquo;avez explicitement
            demandé, pour vous envoyer notre newsletter. L&rsquo;inscription à un événement et
            l&rsquo;inscription à la newsletter sont toujours deux choix séparés : la newsletter
            n&rsquo;est jamais cochée par défaut.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso">Combien de temps ?</h2>
          <p className="mt-2">
            Vos données d&rsquo;inscription sont conservées le temps nécessaire à
            l&rsquo;organisation de l&rsquo;événement et à nos statistiques internes de
            fréquentation, puis supprimées ou anonymisées. Vous pouvez demander leur suppression à
            tout moment.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso">Qui a accès à ces données ?</h2>
          <p className="mt-2">
            Uniquement l&rsquo;équipe d&rsquo;organisation d&rsquo;Agorabica. Vos données ne sont
            ni vendues, ni partagées avec des tiers à des fins commerciales. Nous n&rsquo;utilisons
            aucun traceur publicitaire sur ce site.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso">Vos droits</h2>
          <p className="mt-2">
            Conformément au RGPD, vous pouvez à tout moment demander l&rsquo;accès, la
            rectification ou la suppression de vos données en écrivant à{" "}
            <a href="mailto:bonjour@agorabica.fr" className="text-brick hover:text-bordeaux">
              bonjour@agorabica.fr
            </a>
            . Pour annuler une inscription à un événement, utilisez le lien présent dans votre
            email de confirmation.
          </p>
        </section>
      </div>
    </div>
  );
}
