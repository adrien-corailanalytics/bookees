import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Client Supabase pour Server Components, Server Actions et Route Handlers.
// Respecte les policies RLS avec la session de l'utilisateur courant
// (anonyme, ou admin connecté via Supabase Auth).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // set() appelé depuis un Server Component : ignorable si le
            // middleware rafraîchit déjà la session.
          }
        },
      },
    }
  );
}
