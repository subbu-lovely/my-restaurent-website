import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">🍽️ Subbu Treat Restaurant</h3>
        <p className="footer-text">📍 Attili, Andhra Pradesh | ☎️ +91 9177552521</p>
        <p className="footer-text">🕒 Open Daily: 11:00 AM – 10:00 PM</p>
        <p className="footer-text">© {new Date().getFullYear()} Subrahmanyam Kondruparthi. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
