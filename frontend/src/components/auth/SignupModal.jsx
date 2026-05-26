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

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-3xl relative shadow-2xl border border-pink-100">

        {/* Close Button */}

        <button
          onClick={() => setShowSignup(false)}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-pink-500 transition-colors"
        >
          ×
        </button>

        {/* Heading */}

        <h1 className="text-3xl font-bold mb-2 text-[#4B1D83]">

          Create Account

        </h1>

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
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
            />
          
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
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
              className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
            />
          
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
            >
          
              {showConfirmPassword ? (
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

          <button
            className="w-full bg-gradient-to-r from-[#4B1D83] to-[#FF5DA2] text-white py-3 rounded-xl font-medium hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >

            {loading ? "Creating..." : "Create Account"}

          </button>

          <div className="relative my-5">
          
            <div className="absolute inset-0 flex items-center">
          
              <div className="w-full border-t border-gray-200"></div>
          
            </div>
          
            <div className="relative flex justify-center text-sm">
          
              <span className="bg-white px-4 text-gray-400">
                OR
              </span>
          
            </div>
          
          </div>
          
          <button
            onClick={signInWithGoogle}
            type="button"
            className="w-full border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300"
          >
          
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
          
            Continue with Google
          
          </button>

        </form>
        <p className="text-center text-gray-600 mt-5">

          Already have an account?
        
          <button
            onClick={() => {
        
              setShowSignup(false);
        
              setShowLogin(true);
        
            }}
            className="ml-1 font-semibold text-[#FF5DA2] hover:underline"
          >
        
            Login
        
          </button>
        
        </p>

      </div>

    </div>

  );
}

export default SignupModal;