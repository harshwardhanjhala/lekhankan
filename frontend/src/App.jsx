import { useEffect, useState } from "react";

import LandingPage from "./pages/LandingPage";

import LoginModal from "./components/auth/LoginModal";
import SignupModal from "./components/auth/SignupModal";


import { supabase } from "./lib/supabase";

import Dashboard from "./pages/Dashboard";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

function App() {

  const [showLogin, setShowLogin] = useState(false);

  const [showSignup, setShowSignup] = useState(false);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

  const getSession = async () => {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUser(session?.user || null);

  };

  getSession();

}, []);

useEffect(() => {

  const {
    data: listener,
  } = supabase.auth.onAuthStateChange(

    (_event, session) => {

      setUser(session?.user || null);

    }

  );

  return () => {

    listener.subscription.unsubscribe();

  };

}, []);

useEffect(() => {

  if (user) {

    navigate("/dashboard");

  }

}, [user]);

const handleLogout = async () => {

  await supabase.auth.signOut();

};

return (

  <Routes>

    {/* Landing Page */}

    <Route
      path="/"
      element={

        <>

          <LandingPage
            onLoginClick={() =>
              setShowLogin(true)
            }
            onSignupClick={() =>
              setShowSignup(true)
            }
          />

          {

            showLogin && (

              <LoginModal
                setShowLogin={setShowLogin}
                setShowSignup={setShowSignup}
              />

            )

          }

          {

            showSignup && (

              <SignupModal
                setShowSignup={setShowSignup}
                setShowLogin={setShowLogin}
              />

            )

          }

        </>

      }
    />

    {/* Dashboard */}

    <Route
      path="/dashboard"
      element={

        user ? (

          <Dashboard
            user={user}
            onLogout={handleLogout}
          />

        ) : (

          <Navigate to="/" />

        )

      }
    />

  </Routes>

);
}

export default App;