import logo from '../assets/cheese-logo.svg';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-logo">
        <img src={logo} alt="Fromage & Co" />
        <span>Fromage & Co</span>
      </div>
      <div className="footer-info">
        <p>Лучший магазин сыров</p>
      </div>
    </footer>
  );
}