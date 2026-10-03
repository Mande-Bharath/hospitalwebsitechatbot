import { CalendarClock, Search, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [specialization, setSpecialization] = useState('All');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_URL}/doctors`);
        setDoctors(response.data.doctors || []);
      } catch (error) {
        console.error('Failed to fetch doctors', error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesQuery =
      doctor.name?.toLowerCase().includes(query.toLowerCase()) ||
      doctor.specialization?.toLowerCase().includes(query.toLowerCase()) ||
      doctor.department?.toLowerCase().includes(query.toLowerCase());

    const matchesSpecialization =
      specialization === 'All' || doctor.specialization === specialization || doctor.department === specialization;

    return matchesQuery && matchesSpecialization;
  });

  const specialties = ['All', ...new Set(doctors.map((doctor) => doctor.specialization).filter(Boolean))];

  if (loading) {
    return <div className="py-16 text-center text-slate-600">Loading doctors...</div>;
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Our specialists</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900">Meet your care team</h1>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search doctors or specializations"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-cyan-400"
            />
          </div>

          <select
            value={specialization}
            onChange={(event) => setSpecialization(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-cyan-400"
          >
            {specialties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-lg font-bold text-cyan-700">
                  {doctor.name?.charAt(0) || 'D'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                  <p className="text-sm text-cyan-600">{doctor.specialization}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                4.9 rating
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {doctor.bio || 'Experienced physician focused on patient-centered care and long-term wellness.'}
              </p>

              <div className="mt-5 space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Department</span>
                  <span className="font-semibold text-slate-800">{doctor.department}</span>
                </div>
                <div className="flex justify-between">
                  <span>Experience</span>
                  <span className="font-semibold text-slate-800">{doctor.experience || 8} years</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee</span>
                  <span className="font-semibold text-slate-800">₹{doctor.consultationFee || 800}</span>
                </div>
              </div>

              <div className="mt-5 space-y-2 rounded-2xl bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CalendarClock className="h-4 w-4 text-cyan-600" />
                  Today&apos;s slots
                </div>
                <div className="flex flex-wrap gap-2">
                  {(doctor.schedule?.[0]?.slots || ['9:00 AM', '11:00 AM', '4:00 PM']).slice(0, 3).map((slot) => (
                    <span key={slot} className="rounded-full bg-white px-2 py-1 text-xs text-slate-600 ring-1 ring-slate-200">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600">
            No matching doctors found. Try a different specialty or name.
          </div>
        )}
      </div>
    </div>
  );
}
