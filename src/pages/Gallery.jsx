import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { supabase } from '../lib/supabaseClient';

const SEED_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900&auto=format&fit=crop', category: 'wedding', caption: 'Traditional Wedding — Gulu' },
  { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop', category: 'culture', caption: 'Bwola Dance Performance' },
  { url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=900&auto=format&fit=crop', category: 'concert', caption: 'Live Concert — Kampala' },
  { url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=900&auto=format&fit=crop', category: 'culture', caption: 'Drummers at Sunset' },
  { url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop', category: 'concert', caption: 'Adungu Session' },
  { url: 'https://images.unsplash.com/photo-1524337409051-8dab577a4b8b?q=80&w=900&auto=format&fit=crop', category: 'wedding', caption: 'Larakaraka Ceremony' },
  { url: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=900&auto=format&fit=crop', category: 'portrait', caption: 'Portrait Series' },
  { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=900&auto=format&fit=crop', category: 'portrait', caption: 'Editorial Shoot' },
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop', category: 'wedding', caption: 'Reception — Gulu Town' },
];

export default function Gallery() {
  const [images, setImages] = useState(SEED_IMAGES);
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('url, category, caption')
          .order('created_at', { ascending: false })
          .limit(60);
        if (error) throw error;
        if (data && data.length) setImages(data);
      } catch {
        // Supabase not configured yet — seed data keeps the page usable
      }
    })();
  }, []);

  const shown = filter === 'all' ? images : images.filter(i => i.category === filter);

  return (
    <Layout>
      <header className="hero page-hero">
        <div className="hero__media">
          <img src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1800&auto=format&fit=crop" alt="" />
        </div>
        <div className="hero__content">
          <p className="eyebrow reveal in">The Archive</p>
          <h1 className="reveal in">Photos.</h1>
        </div>
      </header>

      <section className="section-tight">
        <div className="container">
          <div className="flex gap-16" style={{ flexWrap: 'wrap', marginBottom: 48 }}>
            {['all', 'wedding', 'concert', 'culture', 'portrait'].map(cat => (
              <button key={cat} className={`btn ${filter === cat ? 'btn-solid' : ''}`} onClick={() => setFilter(cat)}>
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <Reveal>
            <div className="grid grid-3">
              {shown.map((img, i) => (
                <div className="tile" key={i} onClick={() => setLightbox(img)}>
                  <img src={img.url} alt={img.caption} loading="lazy" />
                  <p className="tile__label">{img.caption}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {lightbox && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(11,9,8,0.97)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
          onClick={() => setLightbox(null)}
        >
          <button style={{ position: 'absolute', top: 28, right: 36, background: 'none', border: 'none', color: 'var(--bone)', fontSize: '2rem' }}>&times;</button>
          <img src={lightbox.url} alt={lightbox.caption} style={{ maxWidth: '88vw', maxHeight: '80vh', objectFit: 'contain' }} />
          <p className="muted mt-24">{lightbox.caption}</p>
        </div>
      )}
    </Layout>
  );
}
