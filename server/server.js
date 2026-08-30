/* ============================================================
   WU NEN FILM API — deployed to Render.
   Handles server-side tasks the frontend shouldn't do directly:
   booking confirmation emails, and an admin endpoint (using the
   Supabase SERVICE ROLE key, never exposed to the browser).
   ============================================================ */

import express from 'express';
import cors from 'cors';
import bookingRoutes from './routes/booking.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok', service: 'wu-nen-api' }));
app.get('/health', (req, res) => res.json({ status: 'healthy', time: new Date().toISOString() }));

app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => console.log(`Wu Nen Film API listening on port ${PORT}`));
