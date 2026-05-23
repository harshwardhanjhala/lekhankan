import { supabase } from "../lib/supabase";

export const addExpense = async (
  expenseData
) => {

  const {
    data,
    error,
  } = await supabase

    .from("expenses")

    .insert([expenseData])

    .select();

  if (error) {

    throw error;

  }

  return data;

};

export const getExpenses = async (
  userId
) => {

  const {
    data,
    error,
  } = await supabase

    .from("expenses")

    .select("*")

    .eq("user_id", userId)

    .order("created_at", {
      ascending: false,
    });

  if (error) {

    throw error;

  }

  return data;

};