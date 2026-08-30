import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <Layout>
      <header className="hero page-hero">
        <div className="hero__media">
          <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1800&auto=format&fit=crop" alt="" />
        </div>
        <div className="hero__content">
          <p className="eyebrow reveal in">Wu Nen — "You Will See"</p>
          <h1 className="reveal in">About Us.</h1>
        </div>
      </header>

      <section>
        <div className="container" style={{ maxWidth: 820 }}>
          <Reveal>
            <p className="lede">Wu Nen Film started in Gulu with one camera and a mission: put Acholi music, dance,
              and ceremony on screen the way they actually feel — full of colour, rhythm, and detail that gets lost
              when outsiders tell the story instead. The name means "you will see" — a promise that our work shows
              what words can't.</p>
          </Reveal>
          <Reveal>
            <p className="lede mt-24">Today we're a network of cameramen, editors, and producers working across
              Uganda and with the diaspora abroad. We film Acholi music videos and cultural events, and we also
              take bookings from anyone — any community, anywhere — who wants their wedding, concert, or private
              occasion captured properly.</p>
          </Reveal>
        </div>
      </section>

      <div className="zigzag"></div>

      <section>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 40 }}>What we film</p>
          </Reveal>
          <Reveal>
            <div className="grid grid-3">
              <div className="card">
                <h3 style={{ fontSize: '1.2rem' }}>Music &amp; Culture</h3>
                <p className="muted mt-24">Music videos, Bwola and Larakaraka performances, studio sessions.</p>
              </div>
              <div className="card">
                <h3 style={{ fontSize: '1.2rem' }}>Weddings &amp; Ceremonies</h3>
                <p className="muted mt-24">Traditional introductions, church weddings, receptions — full coverage.</p>
              </div>
              <div className="card">
                <h3 style={{ fontSize: '1.2rem' }}>Private &amp; Corporate</h3>
                <p className="muted mt-24">Open to all — portraits, brand shoots, and private events of any kind.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="text-center">
        <div className="container">
          <Reveal>
            <h2>Let's tell<br/>your story.</h2>
            <Link to="/booking" className="btn btn-solid mt-48" style={{ display: 'inline-flex' }}>Book a Filmmaker</Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
