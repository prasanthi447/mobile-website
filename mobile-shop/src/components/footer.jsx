import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">

      {/* FOOTER TOP */}
      <div className="container">
        <div className="footer-top">

          {/* BRAND */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">
                <i className="bi bi-phone"></i>
              </span>

              <span>
                Mobile<span>Hub</span>
              </span>
            </Link>

            <p>
              Your trusted destination for smartphones,
              feature phones, used mobiles and accessories.
            </p>

            {/* SOCIAL ICONS */}
            <div className="footer-social">
              <a href="#facebook" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#instagram" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#twitter" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="#youtube" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-column">
            <h5>Quick Links</h5>

            <Link to="/">Home</Link>
            <Link to="/products">All Mobiles</Link>
            <Link to="/brands">Brands</Link>
            <Link to="/used-mobiles">Used Mobiles</Link>
          </div>

          {/* CATEGORIES */}
          <div className="footer-column">
            <h5>Categories</h5>

            <Link to="/products?category=smart">
              Smartphones
            </Link>

            <Link to="/products?category=feature">
              Feature Phones
            </Link>

            <Link to="/products?category=accessories">
              Accessories
            </Link>

            <Link to="/products?category=speakers">
              Bluetooth Speakers
            </Link>
          </div>

          {/* CUSTOMER SERVICE */}
          <div className="footer-column">
            <h5>Customer Service</h5>

            <a href="#support">Help Center</a>
            <a href="#delivery">Delivery Information</a>
            <a href="#returns">Returns &amp; Refunds</a>
            <a href="#privacy">Privacy Policy</a>
          </div>

          {/* CONTACT */}
          <div className="footer-column footer-contact">
            <h5>Contact Us</h5>

            <div className="contact-item">
              <i className="bi bi-telephone"></i>
              <span>+91 90000 00000</span>
            </div>

            <div className="contact-item">
              <i className="bi bi-envelope"></i>
              <span>support@mobilehub.com</span>
            </div>

            <div className="contact-item">
              <i className="bi bi-geo-alt"></i>
              <span>Hyderabad, Telangana</span>
            </div>
          </div>

        </div>

        {/* TRUST FEATURES */}
        <div className="footer-features">

          <div className="footer-feature">
            <i className="bi bi-shield-check"></i>
            <div>
              <strong>Quality Checked</strong>
              <span>Reliable products</span>
            </div>
          </div>

          <div className="footer-feature">
            <i className="bi bi-truck"></i>
            <div>
              <strong>Fast Delivery</strong>
              <span>Quick &amp; secure shipping</span>
            </div>
          </div>

          <div className="footer-feature">
            <i className="bi bi-arrow-counterclockwise"></i>
            <div>
              <strong>Easy Returns</strong>
              <span>Simple return process</span>
            </div>
          </div>

          <div className="footer-feature">
            <i className="bi bi-headset"></i>
            <div>
              <strong>Customer Support</strong>
              <span>We're here to help</span>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>
            © {new Date().getFullYear()} MobileHub. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#security">Security</a>
          </div>
        </div>
      </div>

    </footer>
  );
}