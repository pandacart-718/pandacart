import { useEffect, useState } from "react";
import Header from "../components/Header";
import Products from "./Products";

export default function CompleteProfile({ email }) {
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [residence, setResidence] = useState("");

  useEffect(() => {
    if (localStorage.getItem("pandacart_profile_done") === "true") {
      setDone(true);
    }
  }, []);

  const submit = () => {
    if (!name || !phone || !residence) {
      return alert("Fill all details");
    }
    localStorage.setItem("pandacart_profile_done", "true");
    setDone(true);
  };

  if (done) return <Products />;

  return (
    <>
      <Header />
      <div className="page">
        <div className="card">
          <h2>Complete Profile</h2>
          <p>{email}</p>

          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <textarea
            placeholder="Residence (landmark / society / building)"
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
          />

          <button onClick={submit}>Continue</button>
        </div>
      </div>
    </>
  );
}
