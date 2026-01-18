import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="PandaCart Logo" />
      <h1>PandaCart</h1>
    </header>
  );
}
