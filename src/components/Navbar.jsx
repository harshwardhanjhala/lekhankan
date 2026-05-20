function Navbar({ setShowLogin, setShowSignup }) {

  return (

    <nav className="flex items-center justify-between px-10 py-5 border-b">

      <h1 className="text-3xl font-bold text-purple-600">
        Lekhankan
      </h1>

      <div className="flex gap-4">

        <button
          onClick={() => setShowLogin(true)}
          className="px-6 py-2 border rounded-lg"
        >
          Log in
        </button>

        <button
          onClick={() => setShowSignup(true)}
          className="px-6 py-2 bg-black text-white rounded-lg"
        >
          Sign up
        </button>

      </div>

    </nav>

  );
}

export default Navbar;