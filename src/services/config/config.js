import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_DB_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

export const authToken = import.meta.env.VITE_SUPABASE_AUTH_TOKEN;

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
export const bucketName = "products.images";
