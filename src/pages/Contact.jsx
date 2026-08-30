import { useState } from 'react';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { supabase } from '../lib/supabaseClient';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState(null);

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setNote(null);
    try {
      const { error } = await supabase.from('messages').insert(form);
      if (error) throw error;
      setNote({ type: 'ok', text: "Message sent. We'll reply within one business day." });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setNote({ type: 'err', text: 'Could not send — please email hello@wunenfilm.com directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section style={{ paddingTop: 180 }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <Reveal>
            <p className="eyebrow">Get in touch</p>
            <h1 style={{ fontSize: 'clamp(2.4rem,6vw,4rem)', margin: '14px 0 40px' }}>Contact.</h1>
          </Reveal>

          <Reveal as="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required value={form.name} onChange={update('name')} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required value={form.email} onChange={update('email')} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" required value={form.subject} onChange={update('subject')} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" required value={form.message} onChange={update('message')} />
            </div>
            <button type="submit" className="btn btn-solid btn-block" disabled={submitting}>
              {submitting ? <><span className="spinner"></span> Sending...</> : 'Send Message'}
            </button>
            {note && <div className={`form-note show ${note.type}`}>{note.text}</div>}
          </Reveal>

          <Reveal>
            <div className="grid grid-2 mt-48" style={{ background: 'var(--line)' }}>
              <div className="card" style={{ background: 'var(--black)' }}>
                <p className="eyebrow" style={{ marginBottom: 14 }}>Email</p>
                <a href="mailto:hello@wunenfilm.com">hello@wunenfilm.com</a>
              </div>
              <div className="card" style={{ background: 'var(--black)' }}>
                <p className="eyebrow" style={{ marginBottom: 14 }}>Based in</p>
                <span>Gulu, Uganda</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
