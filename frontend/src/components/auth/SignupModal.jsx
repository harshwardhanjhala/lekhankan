import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../../lib/supabase";

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

    const { error } = await supabase.auth.signUp({

      email,

      password,

      options: {
        data: {
          full_name: name,
        },
      },

    });

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

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[400px] p-8 rounded-2xl relative">

        {/* Close Button */}

        <button
          onClick={() => setShowSignup(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          ×
        </button>

        {/* Heading */}

        <h1 className="text-3xl font-bold mb-6">

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
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

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
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
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
              className="w-full border p-3 rounded-lg pr-12"
            />
          
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
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
            className="w-full bg-black text-white py-3 rounded-lg"
          >

            {loading ? "Creating..." : "Create Account"}

          </button>

        </form>
        <p className="text-center text-gray-600 mt-5">

          Already have an account?
        
          <button
            onClick={() => {
        
              setShowSignup(false);
        
              setShowLogin(true);
        
            }}
            className="ml-1 font-semibold hover:underline"
          >
        
            Login
        
          </button>
        
        </p>

      </div>

    </div>

  );
}

export default SignupModal;