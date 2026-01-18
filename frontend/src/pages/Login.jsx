import { useState } from "react";
import API_BASE from "../config";

export default function Login({ setIsLoggedIn, setEmail }) {
  const [email, setEmailInput] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    setMessage("Sending OTP...");
    try {
      const res = await fetch(`${API_BASE}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      setMessage(data.message || "OTP sent");
      setStep(2);
    } catch (err) {
      setMessage("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    setMessage("Verifying OTP...");
    try {
      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("pandacart_loggedIn", "true");
        localStorage.setItem("pandacart_email", email);
        setEmail(email);
        setIsLoggedIn(true);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("OTP verification failed");
    }
  };

  return (
    <div className="login-container">
      <h1>PandaCart</h1>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter Gmail"
            value={email}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}
