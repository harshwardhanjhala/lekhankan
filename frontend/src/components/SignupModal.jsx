function SignupModal({ setShowSignup }) {

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[400px] p-8 rounded-2xl relative">

        <button
          onClick={() => setShowSignup(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          ×
        </button>

        <h1 className="text-3xl font-bold mb-6">
          Create your account
        </h1>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
          />

          <button
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>

  );
}

export default SignupModal;