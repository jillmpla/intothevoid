import { Orbit } from "lucide-react";
import { Link } from "react-router";

function Footer() {
  // Updates automatically each year.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-brand-mark" aria-hidden="true">
            <Orbit size={16} />
          </span>

          <span className="footer-name">Into the Void</span>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>

        <p className="footer-copyright">
          © {currentYear} Jill Platts
        </p>
      </div>
    </footer>
  );
}

export default Footer;