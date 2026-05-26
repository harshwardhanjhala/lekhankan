import { supabase } from "../lib/supabase";


// SIGN UP

export const signUp = async (
  fullName,
  email,
  password
) => {

  const { data, error } =
    await supabase.auth.signUp({

      email,
      password,

      options: {

        data: {
          full_name: fullName,
        },

      },

    });

  if (error) throw error;

  return data;

};


// LOGIN

export const signIn = async (
  email,
  password
) => {

  const { data, error } =
    await supabase.auth.signInWithPassword({

      email,
      password,

    });

  if (error) throw error;

  return data;

};


// GOOGLE LOGIN

export const signInWithGoogle =
  async () => {

    const { error } =
      await supabase.auth.signInWithOAuth({

        provider: "google",

        options: {
          redirectTo:
            window.location.origin,
        },

      });

    if (error) throw error;

};


// LOGOUT

export const logout = async () => {

  const { error } =
    await supabase.auth.signOut();

  if (error) throw error;

};