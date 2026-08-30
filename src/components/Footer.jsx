export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <h4>Watch</h4>
            <a href="/videos">Music Videos</a>
            <a href="/gallery">Photo Gallery</a>
            <a href="/events">Past Work</a>
          </div>
          <div className="footer__col">
            <h4>Work With Us</h4>
            <a href="/booking">Book a Filmmaker</a>
            <a href="/about">About Wu Nen</a>
          </div>
          <div className="footer__col">
            <h4>Community</h4>
            <a href="/signup">Create Account</a>
            <a href="/login">Login</a>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <a href="/contact">Get in Touch</a>
            <a href="mailto:hello@wunenfilm.com">hello@wunenfilm.com</a>
          </div>
        </div>
        <div className="zigzag zigzag-dim" style={{ marginBottom: 24 }}></div>
        <div className="footer__bottom">
          <span>© 2026 Wu Nen Film — Gulu, Uganda. All rights reserved.</span>
          <span>Built for Cloudflare Pages · Render · Supabase</span>
        </div>
      </div>
    </footer>
  );
}
