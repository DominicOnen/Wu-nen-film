import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { supabase } from '../lib/supabaseClient';

const SEED_VIDEOS = [
  { title: 'Lyec Pa Lobo — Official Video', artist: 'Okello Brothers', thumb: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=900&auto=format&fit=crop', youtube_id: 'dQw4w9WgXcQ', category: 'Official Video' },
  { title: 'Bwola Nights — Live Session', artist: 'Acholi Cultural Troupe', thumb: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop', youtube_id: 'dQw4w9WgXcQ', category: 'Live Session' },
  { title: 'Gulu Sunrise — Single', artist: 'Lapenno', thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=900&auto=format&fit=crop', youtube_id: 'dQw4w9WgXcQ', category: 'Official Video' },
  { title: 'Adungu Sessions Vol. 1', artist: 'Various Artists', thumb: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop', youtube_id: 'dQw4w9WgXcQ', category: 'Studio Session' },
  { title: 'Homecoming — Anthem', artist: 'Kilama & The Roots', thumb: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=900&auto=format&fit=crop', youtube_id: 'dQw4w9WgXcQ', category: 'Official Video' },
  { title: 'Larakaraka Wedding Songs', artist: 'Gulu Youth Choir', thumb: 'https://images.unsplash.com/photo-1524337409051-8dab577a4b8b?q=80&w=900&auto=format&fit=crop', youtube_id: 'dQw4w9WgXcQ', category: 'Documentary' },
];

export default function Videos() {
  const [videos, setVideos] = useState(SEED_VIDEOS);
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('music_videos')
          .select('title, artist, thumb, youtube_id, category')
          .order('created_at', { ascending: false })
          .limit(60);
        if (error) throw error;
        if (data && data.length) setVideos(data);
      } catch {
        // Supabase not configured yet — seed data keeps the page usable
      }
    })();
  }, []);

  const categories = ['all', ...new Set(videos.map(v => v.category))];
  const shown = filter === 'all' ? videos : videos.filter(v => v.category === filter);

  return (
    <Layout>
      <header className="hero page-hero">
        <div className="hero__media">
          <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1800&auto=format&fit=crop" alt="" />
        </div>
        <div className="hero__content">
          <p className="eyebrow reveal in">Sound &amp; Screen</p>
          <h1 className="reveal in">Music Videos.</h1>
        </div>
      </header>

      <section className="section-tight">
        <div className="container">
          <div className="flex gap-16" style={{ flexWrap: 'wrap', marginBottom: 48 }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`btn ${filter === cat ? 'btn-solid' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <Reveal>
            <div className="grid grid-3">
              {shown.map((v, i) => (
                <div className="tile video-tile" key={i} onClick={() => setActive(v)}>
                  <img src={v.thumb} alt={v.title} loading="lazy" />
                  <div className="tile__play"><span>▶</span></div>
                  <p className="tile__meta">{v.category}</p>
                  <p className="tile__label">{v.title} — {v.artist}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {active && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(11,9,8,0.96)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 20 }}
          onClick={() => setActive(null)}
        >
          <button
            style={{ position: 'absolute', top: 28, right: 36, background: 'none', border: 'none', color: 'var(--bone)', fontSize: '2rem' }}
            onClick={() => setActive(null)}
          >&times;</button>
          <div style={{ width: '100%', maxWidth: 960, aspectRatio: '16/9' }} onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%" height="100%"
              src={`https://www.youtube.com/embed/${active.youtube_id}?autoplay=1`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 'none' }}
            />
          </div>
          <p className="muted mt-24">{active.title} — {active.artist}</p>
        </div>
      )}
    </Layout>
  );
}
