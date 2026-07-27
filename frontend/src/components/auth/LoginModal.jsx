import { useState } from "react";
import {
  signIn,
  signInWithGoogle,
} from "../../services/authService";

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
      await signIn(email, password);

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

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-blur-sm">

      <div className="relative w-[400px] rounded-xl border border-border bg-card p-8 shadow-lg">

        {/* Close Button */}

        <button
          onClick={() => setShowLogin(false)}
          className="absolute right-4 top-4 text-2xl text-muted-foreground transition-colors hover:text-foreground"
        >
          ×
        </button>

        {/* Heading */}

        <h1 className="mb-2 text-2xl font-bold">

          Welcome back

        </h1>

        <p className="mb-6 text-sm text-muted-foreground">
          Sign in to your account
        </p>

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
            className="w-full rounded-lg border border-input p-3 transition-all outline-none focus:ring-2 focus:ring-ring"
          />

          {/* Password */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input p-3 pr-12 transition-all outline-none focus:ring-2 focus:ring-ring"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>

          {error && (
          
            <p className="text-sm text-destructive">
          
              {error}
          
            </p>
          
          )}

          {/* Login Button */}

          <button
            className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >

            {loading ? "Signing in..." : "Sign in"}

          </button>
          
          <div className="relative my-5">
          
            <div className="absolute inset-0 flex items-center">
          
              <div className="w-full border-t border-border"></div>
          
            </div>
          
            <div className="relative flex justify-center text-sm">
          
              <span className="bg-card px-4 text-muted-foreground">
                OR
              </span>
          
            </div>
          
          </div>
          
          <button
            onClick={signInWithGoogle}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-border py-3 transition-colors hover:bg-secondary"
          >
          
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
          
            Continue with Google
          
          </button>

        </form>

        {/* Switch To Signup */}

        <p className="mt-5 text-center text-muted-foreground">

          Don't have an account?

          <button
            onClick={() => {

              setShowLogin(false);

              setShowSignup(true);

            }}
            className="ml-1 font-semibold text-primary transition-colors hover:text-primary-hover"
          >

            Sign up

          </button>

        </p>

      </div>

    </div>

  );
}

export default LoginModal;
