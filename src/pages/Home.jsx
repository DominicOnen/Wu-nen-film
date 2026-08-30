import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Layout>
      <header className="hero">
        <div className="hero__media">
          {/* Replace with real Acholi event/concert footage — MP4, ideally <10MB, muted+looped */}
          <video autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1800&auto=format&fit=crop">
            <source src="https://cdn.coverr.co/videos/coverr-african-drummers-playing-2789/1080p.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero__content">
          <p className="eyebrow reveal in">Gulu, Uganda — Film &amp; Photography</p>
          <h1 className="reveal in">Wu Nen<br/>Film.</h1>
          <p className="lede reveal in" style={{ marginTop: 24 }}>
            "Wu nen" — Acholi for "you will see." We capture Acholi music and culture on screen,
            and connect anyone — near or far — with cameramen and producers for weddings,
            introductions, concerts, and private shoots.
          </p>
          <div className="flex gap-16 mt-48 reveal in">
            <Link to="/booking" className="btn btn-solid">Book a Filmmaker</Link>
            <Link to="/videos" className="btn">Watch Music Videos</Link>
          </div>
        </div>
        <div className="hero__scroll">Scroll</div>
      </header>

      <div className="zigzag"></div>

      <section className="section-tight">
        <div className="container">
          <div className="grid grid-3">
            <Reveal><p className="display" style={{ fontSize: '2.5rem' }}>180+</p><p className="muted">Videos &amp; shoots produced</p></Reveal>
            <Reveal><p className="display" style={{ fontSize: '2.5rem' }}>25</p><p className="muted">Filmmakers in the network</p></Reveal>
            <Reveal><p className="display" style={{ fontSize: '2.5rem' }}>6</p><p className="muted">Countries we've filmed in</p></Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">Featured</p>
              <h2>Music<br/>videos.</h2>
            </Reveal>
            <Link to="/videos" className="btn">All Videos</Link>
          </div>
          <Reveal>
            <div className="grid grid-3">
              <div className="tile video-tile">
                <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=900&auto=format&fit=crop" alt="Acholi concert performance" />
                <div className="tile__play"><span>▶</span></div>
                <p className="tile__meta">Music Video</p>
                <p className="tile__label">Lyec Pa Lobo — Official Video</p>
              </div>
              <div className="tile video-tile">
                <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop" alt="Traditional dance performance" />
                <div className="tile__play"><span>▶</span></div>
                <p className="tile__meta">Music Video</p>
                <p className="tile__label">Bwola Nights — Live Session</p>
              </div>
              <div className="tile video-tile">
                <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=900&auto=format&fit=crop" alt="Drummers performing" />
                <div className="tile__play"><span>▶</span></div>
                <p className="tile__meta">Music Video</p>
                <p className="tile__label">Gulu Sunrise — Single</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ background: 'var(--panel)' }}>
        <div className="container">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">The Work</p>
              <h2>Every event,<br/>every story.</h2>
            </Reveal>
          </div>
          <Reveal>
            <div className="grid grid-3" style={{ background: 'var(--line)' }}>
              <div className="card" style={{ background: 'var(--panel)' }}>
                <p className="eyebrow" style={{ marginBottom: 20 }}>01</p>
                <h3 style={{ fontSize: '1.3rem' }}>Weddings &amp; introductions</h3>
                <p className="muted mt-24">Traditional ceremonies, church weddings, and everything between — shot with care for detail.</p>
              </div>
              <div className="card" style={{ background: 'var(--panel)' }}>
                <p className="eyebrow" style={{ marginBottom: 20 }}>02</p>
                <h3 style={{ fontSize: '1.3rem' }}>Concerts &amp; music videos</h3>
                <p className="muted mt-24">From studio sessions to live Bwola performances — full production, edited and delivered.</p>
              </div>
              <div className="card" style={{ background: 'var(--panel)' }}>
                <p className="eyebrow" style={{ marginBottom: 20 }}>03</p>
                <h3 style={{ fontSize: '1.3rem' }}>Private &amp; corporate shoots</h3>
                <p className="muted mt-24">Open to everyone, everywhere — not just the Acholi community. Book a crew for any occasion.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">Community</p>
              <h2>Join<br/>Wu Nen.</h2>
            </Reveal>
            <Link to="/signup" className="btn btn-solid">Join Free</Link>
          </div>
          <Reveal>
            <p className="lede">Create an account to save your favourite videos, track your bookings, and revisit
              past event galleries — all in one place.</p>
          </Reveal>
        </div>
      </section>

      <div className="culture-strip">
        <div className="c1"></div><div className="c2"></div><div className="c3"></div><div className="c4"></div>
      </div>

      <section className="text-center">
        <div className="container">
          <Reveal>
            <h2>Let's tell<br/>your story.</h2>
            <div className="flex gap-16 mt-48" style={{ justifyContent: 'center' }}>
              <Link to="/booking" className="btn btn-solid">Start a Booking</Link>
              <Link to="/gallery" className="btn">See the Photos</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
