import { useState } from "react";
import Home from "./pages/Home";
import LoginScreen from "./components/LoginScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <Home />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </>
  );
}
