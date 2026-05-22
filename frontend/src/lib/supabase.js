import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://ylrjvcticiqywwarmbnl.supabase.co";

const supabaseAnonKey =
  "sb_publishable_3u5MkKgZ__hRwxuvInSnvQ_O4GaBBzX";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);