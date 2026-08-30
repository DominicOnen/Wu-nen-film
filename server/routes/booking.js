import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

// Service role key — full DB access, server-side only. NEVER expose this
// in frontend code. Set it as an environment variable on Render.
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// POST /api/bookings/notify — called after a booking is saved to Supabase.
// Sends a confirmation email. Plug in your email provider of choice
// (Resend, SendGrid, Postmark...).
router.post('/notify', async (req, res) => {
  const { full_name, email, service_type, event_date, location } = req.body;

  if (!email || !event_date) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }

  try {
    // Example using Resend (https://resend.com) — uncomment and add
    // RESEND_API_KEY as an env var to enable real email sending.
    //
    // await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'Wu Nen Film <bookings@wunenfilm.com>',
    //     to: email,
    //     subject: 'Booking request received',
    //     html: `<p>Hi ${full_name}, we received your request for a ${service_type}
    //            on ${event_date} at ${location}. We'll confirm within 24 hours.</p>`,
    //   }),
    // });

    console.log(`Booking notification queued for ${email} (${service_type}, ${event_date})`);
    res.json({ success: true });
  } catch (err) {
    console.error('Notify error:', err);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// GET /api/bookings/admin — example admin-only read using the service role
// (bypasses RLS). Protect this properly (auth middleware) before real use.
router.get('/admin', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
