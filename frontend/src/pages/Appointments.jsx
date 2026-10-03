import { CalendarDays, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const formatDate = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export default function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_URL}/doctors`);
        const doctorList = response.data.doctors || [];
        setDoctors(doctorList);
        if (doctorList.length > 0) {
          setSelectedDoctor(doctorList[0]._id);
        }
      } catch (error) {
        console.error('Failed to load doctors for appointment booking', error);
      }
    };

    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get(`${API_URL}/appointments/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data.appointments || []);
      } catch (error) {
        console.error('Failed to fetch appointments', error);
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Please log in first to book an appointment.');
      return;
    }

    if (!selectedDoctor || !date || !slot) {
      setMessage('Please select a doctor, date, and appointment slot.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${API_URL}/appointments/book`,
        { doctorId: selectedDoctor, appointmentDate: date, slot, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message || 'Appointment booked successfully.');
      setNotes('');
      setSlot('');

      const updatedAppointments = await axios.get(`${API_URL}/appointments/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(updatedAppointments.data.appointments || []);
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Unable to book the appointment at the moment.');
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem('token');

  return (
    <div className="grid gap-8 pb-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Appointments</p>
            <h1 className="text-3xl font-black text-slate-900">Book a consultation</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Select doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none ring-0 focus:border-cyan-400"
            >
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} — {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Preferred date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Time slot</label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-cyan-400"
              >
                <option value="">Select slot</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="1:30 PM">1:30 PM</option>
                <option value="4:00 PM">4:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Briefly explain your concern or reason for appointment."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300"
          >
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>

          {message && (
            <div className="flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4" />
              <span>{message}</span>
            </div>
          )}

          {!token && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              Log in to save and manage your appointment history.
            </div>
          )}
        </form>
      </div>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Quick info</p>
            <h2 className="mt-2 text-2xl font-bold">Why patients choose us</h2>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-cyan-400" />
                <p className="font-medium">Fast scheduling</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">Appointments confirmed in minutes with smart slot management.</p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
                <p className="font-medium">Expert clinicians</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">Board-certified specialists across the largest departments.</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">My bookings</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Upcoming visits</h3>
            </div>
            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
              {appointments.length} booked
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {appointments.length > 0 ? (
              appointments.slice(0, 3).map((appointment) => (
                <div key={appointment._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900">{appointment.doctor?.name || 'Doctor'}</p>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                      {appointment.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{appointment.doctor?.specialization || 'General Care'}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{formatDate(appointment.appointmentDate)}</span>
                    <span>{appointment.slot}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                No appointments yet. Book your first visit to see it here.
              </div>
            )}
          </div>

          {!token && (
            <Link
              to="/login"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Login to view appointments
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
}
