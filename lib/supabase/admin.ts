import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Client "service_role" : contourne RLS. Réservé aux Route Handlers qui
// doivent agir sur des données publiques sans session admin, sous contrôle
// explicite du code applicatif (ex : créer une inscription, l'annuler via
// un token). Ne jamais exposer ce client ou sa clé côté navigateur.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
