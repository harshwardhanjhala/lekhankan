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

  const { data, error } =
    await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .order("date", {
        ascending: false,
      });

  if (error) {

    throw error;

  }

  return data;

};

export const deleteExpense = async (
  expenseId
) => {

  const { error } = await supabase

    .from("expenses")

    .delete()

    .eq("id", expenseId);

  if (error) {

    throw error;

  }

};

export const updateExpense = async (
  expenseId,
  updatedData
) => {

  const { data, error } =
    await supabase

      .from("expenses")

      .update(updatedData)

      .eq("id", expenseId);

  if (error) {

    throw error;

  }

  return data;

};