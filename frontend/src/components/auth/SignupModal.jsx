import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  signUp,
  signInWithGoogle,
} from "../../services/authService";

function SignupModal({
  setShowSignup,
  setShowLogin,
}) {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState("");

  const handleSignup = async (e) => {

  e.preventDefault();

  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword
  ) {

    setError("Please fill all fields");

    return;

  }

  if (password.length < 6) {

    setError("Password must be at least 6 characters");

    return;

  }

  if (password !== confirmPassword) {

    setError("Passwords do not match");

    return;

  }

  try {

    setLoading(true);

    const { error } = await signUp(
        fullName,
        email,
        password
      );

    if (error) {

      setError(error.message);

      return;

    }

    alert("Signup successful!");

    setShowSignup(false);

  } catch (err) {

  console.log(err);

  setError(err.message);

} finally {

    setLoading(false);

  }

};

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay px-4 backdrop-blur-sm">

      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg">

        {/* Close Button */}

        <button
          onClick={() => setShowSignup(false)}
          className="absolute right-4 top-4 text-2xl text-muted-foreground transition-colors hover:text-foreground"
        >
          ×
        </button>

        {/* Heading */}

        <h1 className="mb-2 text-2xl font-bold">

          Create Account

        </h1>

        <p className="mb-6 text-sm text-muted-foreground">
          Get started with Lekhankan
        </p>

        {/* Form */}

        <form
          onSubmit={handleSignup}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-input p-3 transition-all outline-none focus:ring-2 focus:ring-ring"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-input p-3 transition-all outline-none focus:ring-2 focus:ring-ring"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input p-3 transition-all outline-none focus:ring-2 focus:ring-ring"
            />
          
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
          
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
          
            </button>
          
          </div>
          
          <div className="relative">
          
             <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full rounded-lg border border-input p-3 transition-all outline-none focus:ring-2 focus:ring-ring"
            />
          
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
          
              {showConfirmPassword ? (
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

          <button
            className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >

            {loading ? "Creating..." : "Create Account"}

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
        <p className="mt-5 text-center text-muted-foreground">

          Already have an account?
        
          <button
            onClick={() => {
        
              setShowSignup(false);
        
              setShowLogin(true);
        
            }}
            className="ml-1 font-semibold text-primary transition-colors hover:text-primary-hover"
          >
        
            Login
        
          </button>
        
        </p>

      </div>

    </div>

  );
}

export default SignupModal;
