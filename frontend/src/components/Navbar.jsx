import { CalendarDays, Hospital, Menu, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/appointments', label: 'Appointments' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const syncUser = () => {
      try {
        const savedUser = localStorage.getItem('user');
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener('auth:update', syncUser);
    return () => window.removeEventListener('auth:update', syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('auth:update'));
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-200">
            <Hospital className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">MediCare</p>
            <p className="text-xs text-slate-500">Hospital Network</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-cyan-700' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <CalendarDays className="h-4 w-4" />
            24/7 Support
          </div>

          {user ? (
            <>
              <div className="rounded-full bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700">
                Hi, {user.name?.split(' ')[0] || 'Patient'}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-cyan-700"
            >
              <UserRound className="h-4 w-4" />
              Login
            </NavLink>
          )}
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 md:hidden">
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
      </div>
    </header>
  );
}
