import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabaseClient';

// If you deploy /server to Render, set its URL here to also trigger a
// confirmation email on submit. Leave blank to skip it.
const RENDER_API_URL = ''; // e.g. 'https://wu-nen-api.onrender.com'

export default function Booking() {
  const { session } = useAuth();
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', serviceType: '', eventDate: '',
    location: '', guestCount: '', details: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState(null);

  useEffect(() => {
    if (session) {
      setForm(f => ({
        ...f,
        email: session.user.email || '',
        fullName: session.user.user_metadata?.full_name || '',
      }));
    }
  }, [session]);

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setNote(null);

    const payload = {
      user_id: session ? session.user.id : null,
      full_name: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service_type: form.serviceType,
      event_date: form.eventDate,
      location: form.location.trim(),
      guest_count: form.guestCount || null,
      details: form.details.trim(),
      status: 'pending',
    };

    try {
      const { error } = await supabase.from('bookings').insert(payload);
      if (error) throw error;

      if (RENDER_API_URL) {
        fetch(`${RENDER_API_URL}/api/bookings/notify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {});
      }

      setNote({ type: 'ok', text: "Booking request received. We'll email you within 24 hours to confirm." });
      setForm({ fullName: '', email: '', phone: '', serviceType: '', eventDate: '', location: '', guestCount: '', details: '' });
    } catch (err) {
      console.error(err);
      setNote({ type: 'err', text: 'Something went wrong saving your request. Please try again or email us directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <header className="hero page-hero" style={{ minHeight: '44vh' }}>
        <div className="hero__media">
          <img src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1800&auto=format&fit=crop" alt="" />
        </div>
        <div className="hero__content">
          <p className="eyebrow reveal in">Reserve a Date</p>
          <h1 className="reveal in">Book a<br/>Filmmaker.</h1>
        </div>
      </header>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <p className="muted" style={{ marginBottom: 48 }}>
              Tell us about your event — wedding, introduction, concert, or private shoot. Open to everyone,
              anywhere; not limited to the Acholi community. We'll match you with a cameraman or producer from
              our network within 24 hours.
            </p>
          </Reveal>

          <Reveal as="form" id="bookingForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full name</label>
                <input type="text" id="fullName" required value={form.fullName} onChange={update('fullName')} autoComplete="name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required value={form.email} onChange={update('email')} autoComplete="email" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" value={form.phone} onChange={update('phone')} autoComplete="tel" />
              </div>
              <div className="form-group">
                <label htmlFor="serviceType">Service needed</label>
                <select id="serviceType" required value={form.serviceType} onChange={update('serviceType')}>
                  <option value="">Select one</option>
                  <option value="wedding">Wedding / Introduction</option>
                  <option value="concert">Concert / Music Video</option>
                  <option value="documentary">Documentary / Cultural Event</option>
                  <option value="portrait">Portrait / Photo Session</option>
                  <option value="corporate">Corporate / Private Shoot</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="eventDate">Event date</label>
                <input type="date" id="eventDate" required value={form.eventDate} onChange={update('eventDate')} />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input type="text" id="location" required placeholder="City, venue, or country" value={form.location} onChange={update('location')} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="guestCount">Estimated guests / attendees</label>
              <input type="number" id="guestCount" min="1" placeholder="e.g. 150" value={form.guestCount} onChange={update('guestCount')} />
            </div>

            <div className="form-group">
              <label htmlFor="details">Tell us about the event</label>
              <textarea id="details" rows="4" placeholder="Style you're after, schedule, must-have shots..." value={form.details} onChange={update('details')} />
            </div>

            <button type="submit" className="btn btn-solid btn-block" disabled={submitting}>
              {submitting ? <><span className="spinner"></span> Submitting...</> : 'Submit Booking Request'}
            </button>

            {note && <div className={`form-note show ${note.type}`}>{note.text}</div>}
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
