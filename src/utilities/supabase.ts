import { createClient } from "@supabase/supabase-js";

const env = import.meta.env;

const supabase = createClient(
  env.VITE_SUPABASE_COMPANY_URL,
  env.VITE_SUPABSE_ANON_KEY
);

const Upload = (fileName: string, file: any) => {
  return supabase.storage
    .from(env.VITE_SUPABASE_BUCKET_URL)
    .upload(fileName, file, {
      upsert: true,
    });
};

const Download = (fileName: string) => {
  return supabase.storage
    .from(env.VITE_SUPABASE_BUCKET_URL)
    .getPublicUrl(fileName);
};

export { Upload, Download };
