import {
  Activity,
  ArrowRight,
  CalendarCheck2,
  Clock3,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Doctors', value: '45+' },
  { label: 'Departments', value: '18' },
  { label: 'Patients Served', value: '20k+' },
  { label: 'Avg. Satisfaction', value: '96%' },
];

const services = [
  { icon: HeartPulse, title: 'Cardiology', description: 'Advanced care for heart health and preventive treatment.' },
  { icon: Stethoscope, title: 'General Medicine', description: 'Personalized consultations and routine health checkups.' },
  { icon: ShieldCheck, title: 'Emergency Care', description: 'Fast and reliable emergency support when every minute matters.' },
  { icon: Activity, title: 'Diagnostics', description: 'Modern imaging and lab testing to support accurate care.' },
];

const careSteps = [
  { step: '01', title: 'Choose a specialist', text: 'Explore doctors by department and expertise.' },
  { step: '02', title: 'Book in minutes', text: 'Select available slots and send your care notes.' },
  { step: '03', title: 'Get guided support', text: 'Track appointments and follow-up care with confidence.' },
];

const wellnessTips = [
  'Stay hydrated and keep a weekly sleep routine.',
  'Book preventive checkups before symptoms worsen.',
  'Use digital reminders for medication and follow-ups.',
];

export default function Home() {
  return (
    <div className="space-y-16 pb-10">
      <section className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-600 via-cyan-500 to-sky-700 px-6 py-10 text-white shadow-2xl shadow-cyan-200 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-[0.22em] text-cyan-50">
            TRUSTED CARE, MODERN EXPERIENCE
          </span>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Health support that feels personal, fast, and reassuring.
          </h1>
          <p className="max-w-xl text-base text-cyan-50/90 md:text-lg">
            Book appointments, find top specialists, and keep your care journey organized with a smarter hospital experience.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/appointments"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-cyan-700 transition hover:bg-cyan-50"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Meet Doctors
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white/10 p-5 backdrop-blur-sm">
          <div className="rounded-[1.5rem] bg-white p-5 text-slate-800 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Next available</p>
                <h3 className="text-xl font-bold">Dr. Maya Bennett</h3>
              </div>
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                <CalendarCheck2 className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Department</span>
                <span className="font-semibold">Cardiology</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Today</span>
                <span className="font-semibold">3:30 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Consultation</span>
                <span className="font-semibold">₹1200</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-cyan-50 px-3 py-2 text-sm text-cyan-700">
              <span className="flex items-center gap-2 font-medium">
                <Sparkles className="h-4 w-4" />
                Priority slot
              </span>
              <span>2 seats left</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Our services</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Comprehensive care, tailored to you.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 inline-flex rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">How it works</p>
          <h2 className="mt-3 text-3xl font-bold">Simple steps to better care</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {careSteps.map(({ step, title, text }) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 inline-flex rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-semibold text-cyan-200">
                  {step}
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-2 text-emerald-700">
              <Clock3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Daily wellness</p>
              <h3 className="text-2xl font-bold text-slate-900">Healthy habits</h3>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {wellnessTips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-3 py-3 text-sm text-slate-700">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
