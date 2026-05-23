import { useState } from "react";
import { supabase } from "../../lib/supabase";

import {
  Eye,
  EyeOff,
} from "lucide-react";

function LoginModal({
  setShowLogin,
  setShowSignup,
}) {

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e) => {

  e.preventDefault();

  setError("");

  try {

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      });

    if (error) {

      setError(error.message);

      return;

    }


    setShowLogin(false);

  } catch (err) {

    setError(err.message);

  } finally {

    setLoading(false);

  }

};

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[400px] p-8 rounded-2xl relative">

        {/* Close Button */}

        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          ×
        </button>

        {/* Heading */}

        <h1 className="text-3xl font-bold mb-6">

          Welcome back

        </h1>

        {/* Form */}

        <form 
        onSubmit={handleLogin}
        className="space-y-4"
        >

          {/* Email */}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          {/* Password */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-lg pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>

          {error && (
          
            <p className="text-red-500 text-sm">
          
              {error}
          
            </p>
          
          )}

          {/* Login Button */}

          <button
            className="w-full bg-black text-white py-3 rounded-lg"
          >

            {loading ? "Signing in..." : "Sign in"}

          </button>

        </form>

        {/* Switch To Signup */}

        <p className="text-center text-gray-600 mt-5">

          Don't have an account?

          <button
            onClick={() => {

              setShowLogin(false);

              setShowSignup(true);

            }}
            className="ml-1 font-semibold hover:underline"
          >

            Sign up

          </button>

        </p>

      </div>

    </div>

  );
}

export default LoginModal;