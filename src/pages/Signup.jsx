import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { supabase } from '../lib/supabaseClient';

export default function Signup() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setNote(null);
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: { data: { full_name: form.fullName.trim() } },
      });
      if (error) throw error;
      setNote({ type: 'ok', text: 'Account created. Check your email to confirm, then log in.' });
      setTimeout(() => navigate('/login'), 2200);
    } catch (err) {
      setNote({ type: 'err', text: err.message || 'Could not create account. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout hideFooter>
      <div className="auth-wrap">
        <Reveal className="in">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Join Free</p>
          <h1 className="text-center" style={{ fontSize: 'clamp(2rem,6vw,3rem)', margin: '14px 0 40px' }}>Create Account</h1>
        </Reveal>

        <Reveal as="form" className="in" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full name</label>
            <input type="text" id="fullName" required value={form.fullName} onChange={update('fullName')} autoComplete="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required value={form.email} onChange={update('email')} autoComplete="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required minLength={6} value={form.password} onChange={update('password')} autoComplete="new-password" />
          </div>
          <button type="submit" className="btn btn-solid btn-block" disabled={submitting}>
            {submitting ? <><span className="spinner"></span> Creating account...</> : 'Create Account'}
          </button>
          {note && <div className={`form-note show ${note.type}`}>{note.text}</div>}
        </Reveal>

        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </Layout>
  );
}
