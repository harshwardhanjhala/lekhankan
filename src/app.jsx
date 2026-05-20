import { useState } from "react";

import LandingPage from "./pages/LandingPage";

import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

function App() {

  const [showLogin, setShowLogin] = useState(false);

  const [showSignup, setShowSignup] = useState(false);

  return (
    <>

      <LandingPage
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      {showLogin && (
        <LoginModal setShowLogin={setShowLogin} />
        
      )}

      {showSignup && (
        <SignupModal setShowSignup={setShowSignup} />
      )}

    </>
  );
}

export default App;