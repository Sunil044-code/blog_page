import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-sky-100">
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex justify-end">
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 md:p-12 shadow-2xl border border-indigo-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-500 font-semibold">Welcome</p>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800">Create or Read Inspiring Blogs</h1>
              <p className="mt-3 text-slate-600 max-w-2xl">A lightweight blog app to quickly publish and explore quality content.</p>
            </div>
            <div className="rounded-2xl bg-indigo-600 text-white p-4 w-full md:w-auto">
              <p className="text-sm uppercase tracking-[0.2em] font-semibold text-indigo-100">Get started</p>
              <p className="mt-1 text-2xl font-bold">Write Today</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <button
              className="flex-1 rounded-xl bg-indigo-600 text-white px-4 py-3 font-semibold hover:bg-indigo-700 transition"
              onClick={() => navigate("/blog")}
            >
              Read Blogs
            </button>
            <button
              className="flex-1 rounded-xl border border-indigo-600 text-indigo-700 px-4 py-3 font-semibold hover:bg-indigo-50 transition"
              onClick={() => navigate("/login")}
            >
              Create Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

