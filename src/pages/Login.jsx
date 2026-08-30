import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Reveal } from '../components/Reveal';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setNote(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password });
      if (error) throw error;
      navigate('/dashboard');
    } catch (err) {
      setNote({ type: 'err', text: err.message || 'Login failed. Check your details and try again.' });
      setSubmitting(false);
    }
  };

  return (
    <Layout hideFooter>
      <div className="auth-wrap">
        <Reveal className="in">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Welcome Back</p>
          <h1 className="text-center" style={{ fontSize: 'clamp(2rem,6vw,3rem)', margin: '14px 0 40px' }}>Login</h1>
        </Reveal>

        <Reveal as="form" className="in" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required value={form.email} onChange={update('email')} autoComplete="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required value={form.password} onChange={update('password')} autoComplete="current-password" />
          </div>
          <button type="submit" className="btn btn-solid btn-block" disabled={submitting}>
            {submitting ? <><span className="spinner"></span> Logging in...</> : 'Login'}
          </button>
          {note && <div className={`form-note show ${note.type}`}>{note.text}</div>}
        </Reveal>

        <p className="auth-switch">New here? <Link to="/signup">Create an account</Link></p>
      </div>
    </Layout>
  );
}
