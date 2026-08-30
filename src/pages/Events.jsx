import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const SEED_EVENTS = [
  { title: 'Okello & Anena Wedding', category: 'Wedding', location: 'Gulu, Uganda', event_date: '2025-11-14', rating: 5, cover_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900&auto=format&fit=crop', summary: 'Full traditional ceremony and reception coverage — 500+ edited photos and a same-week highlight film.' },
  { title: 'Bwola Cultural Festival', category: 'Culture', location: 'Kitgum, Uganda', event_date: '2025-09-02', rating: 5, cover_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop', summary: 'Multi-camera coverage of the annual Bwola dance festival, delivered as a 12-minute documentary short.' },
  { title: 'Lapenno Album Release Concert', category: 'Concert', location: 'Kampala, Uganda', event_date: '2025-06-20', rating: 4, cover_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=900&auto=format&fit=crop', summary: 'Full concert filming and live music video capture for a Kampala album launch.' },
  { title: 'Diaspora Homecoming Shoot', category: 'Private', location: 'London, UK', event_date: '2025-04-11', rating: 5, cover_url: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=900&auto=format&fit=crop', summary: 'A UK-based Acholi family reunion — proof this isn\'t just for events back home.' },
];

function stars(n) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? 'var(--ochre-bright)' : 'var(--line)' }}>★</span>
  ));
}

function fmtDate(iso) {
  try { return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return iso; }
}

export default function Events() {
  const [events, setEvents] = useState(SEED_EVENTS);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('title, category, location, event_date, rating, cover_url, summary')
          .order('event_date', { ascending: false })
          .limit(30);
        if (error) throw error;
        if (data && data.length) setEvents(data);
      } catch {
        // Supabase not configured yet — seed data keeps the page usable
      }
    })();
  }, []);

  return (
    <Layout>
      <header className="hero page-hero">
        <div className="hero__media">
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1800&auto=format&fit=crop" alt="" />
        </div>
        <div className="hero__content">
          <p className="eyebrow reveal in">The Record</p>
          <h1 className="reveal in">Past Work.</h1>
          <p className="lede reveal in" style={{ marginTop: 20 }}>Every event we've filmed, rated by the client, for the Acholi community and beyond.</p>
        </div>
      </header>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="grid grid-2" style={{ background: 'var(--line)' }}>
              {events.map((ev, i) => (
                <div className="card" key={i} style={{ background: 'var(--black)', padding: 0, overflow: 'hidden' }}>
                  <div className="tile video-tile">
                    <img src={ev.cover_url} alt={ev.title} />
                  </div>
                  <div style={{ padding: 32 }}>
                    <div className="card__meta">
                      <span>{ev.category} — {ev.location}</span>
                      <span>{fmtDate(ev.event_date)}</span>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: 14 }}>{ev.title}</h3>
                    <p className="muted" style={{ marginBottom: 20 }}>{ev.summary}</p>
                    <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>{stars(ev.rating)}</div>
                      <Link to="/gallery" className="btn" style={{ padding: '10px 18px', fontSize: '0.7rem' }}>View Photos</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
