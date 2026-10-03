export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-600 sm:px-6 lg:flex-row lg:px-8">
        <p>© 2026 MediCare Hospital. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </div>
    </footer>
  );
}
