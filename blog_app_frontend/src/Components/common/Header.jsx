export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">Sunil Blogs</p>
          <h1 className="text-2xl md:text-3xl font-black">Write. Share. Inspire.</h1>
        </div>
        <p className="text-sm text-indigo-100/90 italic">“Your next idea can touch thousands.”</p>
      </div>
    </header>
  );
}
