import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const { session } = useAuth();
  const [tab, setTab] = useState('bookings');
  const [bookings, setBookings] = useState(null);
  const [profileName, setProfileName] = useState('');
  const [profileNote, setProfileNote] = useState(null);

  useEffect(() => {
    if (!session) return;
    setProfileName(session.user.user_metadata?.full_name || '');
    (async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setBookings(data || []);
      } catch {
        setBookings([]);
      }
    })();
  }, [session]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({ data: { full_name: profileName.trim() } });
      if (error) throw error;
      setProfileNote({ type: 'ok', text: 'Profile updated.' });
    } catch (err) {
      setProfileNote({ type: 'err', text: err.message || 'Could not update profile.' });
    }
  };

  if (!session) return null;
  const displayName = session.user.user_metadata?.full_name || session.user.email.split('@')[0];

  return (
    <Layout>
      <section style={{ paddingTop: 160 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Welcome back</p>
              <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>{displayName}</h1>
            </div>
            <a href="/booking" className="btn btn-solid">New Booking</a>
          </div>

          <div className="dash-tabs">
            <button className={tab === 'bookings' ? 'active' : ''} onClick={() => setTab('bookings')}>My Bookings</button>
            <button className={tab === 'saved' ? 'active' : ''} onClick={() => setTab('saved')}>Saved Videos</button>
            <button className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}>Profile</button>
          </div>

          {tab === 'bookings' && (
            <div>
              {bookings === null && <p className="muted">Loading...</p>}
              {bookings && bookings.length === 0 && (
                <div className="empty-state">
                  <p className="display" style={{ fontSize: '1.4rem' }}>No bookings yet</p>
                  <p>When you request a filmmaker, it'll show up here.</p>
                  <a href="/booking" className="btn btn-solid mt-24" style={{ display: 'inline-flex' }}>Book a Filmmaker</a>
                </div>
              )}
              {bookings && bookings.map((b) => (
                <div className="card mt-24" key={b.id}>
                  <div className="card__meta">
                    <span>{b.service_type}</span>
                    <span>{b.status}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem' }}>{b.location}</h3>
                  <p className="muted mt-24">
                    {new Date(b.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  {b.details && <p className="muted mt-24">{b.details}</p>}
                </div>
              ))}
            </div>
          )}

          {tab === 'saved' && (
            <div className="empty-state">
              <p className="display" style={{ fontSize: '1.4rem' }}>Save your favourites</p>
              <p>Browse <a href="/videos" style={{ textDecoration: 'underline' }}>music videos</a> and the{' '}
                <a href="/gallery" style={{ textDecoration: 'underline' }}>photo gallery</a> to follow the work you love.</p>
            </div>
          )}

          {tab === 'profile' && (
            <form style={{ maxWidth: 480 }} onSubmit={handleProfileSave}>
              <div className="form-group">
                <label htmlFor="profileName">Full name</label>
                <input type="text" id="profileName" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="profileEmail">Email</label>
                <input type="email" id="profileEmail" value={session.user.email} disabled />
              </div>
              <button type="submit" className="btn btn-solid">Save Changes</button>
              {profileNote && <div className={`form-note show ${profileNote.type}`}>{profileNote.text}</div>}
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
