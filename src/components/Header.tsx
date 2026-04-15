import logo from '../assets/cheese-logo.svg';

export function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <img src={logo} alt="Fromage & Co" />
        <span>Fromage & Co</span>
      </div>
    </header>
  );
}