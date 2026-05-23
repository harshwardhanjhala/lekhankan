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

    <div className="fixed inset-0 bg-[#1a0b2e]/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white/95 border border-pink-100 shadow-2xl w-[400px] p-8 rounded-3xl relative">

        {/* Close Button */}

        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-2xl text-[#5b2a86] hover:text-pink-500 transition-colors"
        >
          ×
        </button>

        {/* Heading */}

        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#5b2a86] to-pink-500 bg-clip-text text-transparent">

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
            className="w-full border border-pink-100 focus:border-[#5b2a86] focus:ring-2 focus:ring-pink-200 outline-none p-3 rounded-xl transition-all"
          />

          {/* Password */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-pink-100 focus:border-[#5b2a86] focus:ring-2 focus:ring-pink-200 outline-none p-3 rounded-xl pr-12 transition-all"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5b2a86] hover:text-pink-500 transition-colors"
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
            className="w-full bg-gradient-to-r from-[#5b2a86] to-pink-500 hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all shadow-lg"
          >

            {loading ? "Signing in..." : "Sign in"}

          </button>

        </form>

        {/* Switch To Signup */}

        <p className="text-center text-gray-500 mt-5">

          Don't have an account?

          <button
            onClick={() => {

              setShowLogin(false);

              setShowSignup(true);

            }}
            className="ml-1 font-semibold text-[#5b2a86] hover:text-pink-500 transition-colors"
          >

            Sign up

          </button>

        </p>

      </div>

    </div>

  );
}

export default LoginModal;