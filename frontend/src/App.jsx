import { useState } from "react";

import LandingPage from "./pages/LandingPage";

import LoginModal from "./components/auth/LoginModal";
import SignupModal from "./components/auth/SignupModal";

function App() {

  const [showLogin, setShowLogin] = useState(false);

  const [showSignup, setShowSignup] = useState(false);

  return (

    <>

      <LandingPage
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      {/* Login Modal */}

      {showLogin && (

        <LoginModal
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
        />

      )}

      {/* Signup Modal */}

      {showSignup && (

        <SignupModal
          setShowSignup={setShowSignup}
          setShowLogin={setShowLogin}
        />

      )}

    </>

  );
}

export default App;