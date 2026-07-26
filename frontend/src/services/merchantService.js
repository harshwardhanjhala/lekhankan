import { supabase } from "../lib/supabase";

export const getMerchantCategory = async (
  userId,
  merchant
) => {

  const { data, error } = await supabase
    .from("merchant_categories")
    .select("category")
    .eq("user_id", userId)
    .eq("merchant", merchant.toLowerCase())
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.category || null;
};

export const saveMerchantCategory = async (
  userId,
  merchant,
  category
) => {

  const { error } = await supabase
    .from("merchant_categories")
    .upsert(
      {
        user_id: userId,
        merchant: merchant.toLowerCase(),
        category,
      },
      {
        onConflict: "user_id,merchant",
      }
    );

  if (error) {
    throw error;
  }
};