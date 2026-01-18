import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Products from "./pages/Products";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("pandacart_loggedIn");
    const savedEmail = localStorage.getItem("pandacart_email");

    if (loggedIn === "true" && savedEmail) {
      setIsLoggedIn(true);
      setEmail(savedEmail);
    }
  }, []);

  return isLoggedIn ? (
    <Products email={email} />
  ) : (
    <Login setIsLoggedIn={setIsLoggedIn} setEmail={setEmail} />
  );
}
