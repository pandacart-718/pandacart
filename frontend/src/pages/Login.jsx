import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Login({ setIsLoggedIn, setEmail }) {
  const [email, setEmailInput] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!sent || timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [sent, timer]);

  // 🔹 SEND OTP (REAL BACKEND)
  const sendOtp = async () => {
    if (!email) {
      setStatus("Please enter your Gmail address");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.message || "Failed to send OTP");
        return;
      }

      setSent(true);
      setTimer(60);
      setStatus("OTP sent to your email");

    } catch (err) {
      setStatus("Server not reachable");
    }
  };

  // 🔹 VERIFY OTP
  const verifyOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.message || "Invalid OTP");
        return;
      }

      localStorage.setItem("pandacart_loggedIn", "true");
      localStorage.setItem("pandacart_email", email);

      setEmail(email);
      setIsLoggedIn(true);

    } catch {
      setStatus("Verification failed");
    }
  };

  return (
    <>
      <Header />

      <div className="page">
        <div className="card">
          <h2>Login with Gmail</h2>

          {status && <p className="status">{status}</p>}

          {!sent ? (
            <>
              <input
                type="email"
                placeholder="Enter your Gmail"
                value={email}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button onClick={sendOtp}>Send OTP</button>
            </>
          ) : (
            <>
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button onClick={verifyOtp}>Verify OTP</button>

              <div className="timer">
                {timer > 0 ? (
                  <span>Resend OTP in {timer}s</span>
                ) : (
                  <button onClick={sendOtp}>Resend OTP</button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
