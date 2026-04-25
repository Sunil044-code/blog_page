import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function CreateBlog() {
  const { logOut } = useContext(AuthContext);
  const [blogData, setBlogData] = useState({
    title: "",
    summary: "",
    author: "",
    created_at: "",
    featured: "false",
    body: "",
    tags: "",
    cover_url: "",
  });
  const [status, setStatus] = useState(null);
  const [formError, setFormError] = useState("");

  const logOutHandler = () => {
    localStorage.removeItem("token");
    logOut();
  };

  const validate = () => {
    if (!blogData.title.trim()) return "Title is required.";
    if (!blogData.summary.trim()) return "Summary is required.";
    if (!blogData.author.trim()) return "Author is required.";
    if (!blogData.body.trim()) return "Body is required.";
    return "";
  };

  const previewTags = useMemo(
    () =>
      blogData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [blogData.tags]
  );

  const formOnSubmitHandler = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setFormError(error);
      setStatus(null);
      return;
    }

    const token = localStorage.getItem("TOKEN");
    if (!token) {
      setFormError("You must be logged in to publish.");
      setStatus(null);
      return;
    }

    try {
      const payload = {
        ...blogData,
        tags: previewTags,
      };

      const response = await fetch("http://localhost:3001/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        setFormError(result.message || "Could not create blog.");
        setStatus(null);
        return;
      }

      setFormError("");
      setStatus("Blog created successfully! 🎉");
      setBlogData({
        title: "",
        summary: "",
        author: "",
        created_at: "",
        featured: "false",
        body: "",
        tags: "",
        cover_url: "",
      });

      console.log("Saved blog:", result.result);
    } catch (err) {
      setFormError("Network error while saving blog.");
      setStatus(null);
      console.error(err);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";

  const fieldClass = "flex flex-col gap-2";

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto rounded-3xl bg-white/90 shadow-2xl backdrop-blur border border-indigo-100 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-indigo-500 text-white p-5 md:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-indigo-100">Writer Space</p>
            <h1 className="text-3xl md:text-4xl font-black">Create Your Next Blog Post</h1>
            <p className="mt-2 text-sm md:text-base text-indigo-100/90">
              Build your content with a fast form and preview card.
            </p>
          </div>
          <button
            type="button"
            onClick={logOutHandler}
            className="rounded-xl bg-white text-indigo-600 px-4 py-2 font-semibold shadow hover:bg-indigo-100"
          >
            Log Out
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5 p-5 md:p-7">
          <div className="rounded-2xl bg-white p-4 md:p-5 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-700 mb-3">Blog Editor</h2>
            {formError ? (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2 mb-3">
                {formError}
              </div>
            ) : null}
            {status ? (
              <div className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded p-2 mb-3">
                {status}
              </div>
            ) : null}
            <form onSubmit={formOnSubmitHandler} className="space-y-4">
              <div className={fieldClass}>
                <label htmlFor="title" className="font-medium text-slate-700">Title</label>
                <input
                  id="title"
                  type="text"
                  value={blogData.title}
                  onChange={(e) => setBlogData((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Write an attention-grabbing title"
                  className={inputClass}
                />
              </div>

              <div className={fieldClass}>
                <label htmlFor="summary" className="font-medium text-slate-700">Summary</label>
                <textarea
                  id="summary"
                  rows={3}
                  value={blogData.summary}
                  onChange={(e) => setBlogData((p) => ({ ...p, summary: e.target.value }))}
                  placeholder="Summarize the blog in 2-3 lines"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={fieldClass}>
                  <label htmlFor="author" className="font-medium text-slate-700">Author</label>
                  <input
                    id="author"
                    type="text"
                    value={blogData.author}
                    onChange={(e) => setBlogData((p) => ({ ...p, author: e.target.value }))}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div className={fieldClass}>
                  <label htmlFor="created_at" className="font-medium text-slate-700">Posted Date</label>
                  <input
                    id="created_at"
                    type="date"
                    value={blogData.created_at}
                    onChange={(e) => setBlogData((p) => ({ ...p, created_at: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className={fieldClass}>
                <label className="font-medium text-slate-700">Featured Post</label>
                <div className="flex gap-3 items-center">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="featured"
                      value="true"
                      checked={blogData.featured === "true"}
                      onChange={(e) => setBlogData((p) => ({ ...p, featured: e.target.value }))}
                      className="accent-indigo-500"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="featured"
                      value="false"
                      checked={blogData.featured === "false"}
                      onChange={(e) => setBlogData((p) => ({ ...p, featured: e.target.value }))}
                      className="accent-indigo-500"
                    />
                    No
                  </label>
                </div>
              </div>

              <div className={fieldClass}>
                <label htmlFor="cover_url" className="font-medium text-slate-700">Cover Image URL (optional)</label>
                <input
                  id="cover_url"
                  type="url"
                  value={blogData.cover_url}
                  onChange={(e) => setBlogData((p) => ({ ...p, cover_url: e.target.value }))}
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>

              <div className={fieldClass}>
                <label htmlFor="body" className="font-medium text-slate-700">Body</label>
                <textarea
                  id="body"
                  rows={6}
                  value={blogData.body}
                  onChange={(e) => setBlogData((p) => ({ ...p, body: e.target.value }))}
                  className={inputClass}
                  placeholder="Write your blog content..."
                />
              </div>

              <div className={fieldClass}>
                <label htmlFor="tags" className="font-medium text-slate-700">Tags (comma separated)</label>
                <input
                  id="tags"
                  value={blogData.tags}
                  onChange={(e) => setBlogData((p) => ({ ...p, tags: e.target.value }))}
                  className={inputClass}
                  placeholder="news, productivity, javascript"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Publish Draft
              </button>
            </form>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-white p-4 border border-indigo-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-500 font-semibold">Live Preview</p>
                <h3 className="text-xl font-bold text-slate-800">How your post will appear</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                blogData.featured === "true" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
              }`}>
                {blogData.featured === "true" ? "Featured" : "Standard"}
              </span>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              {blogData.cover_url ? (
                <img
                  src={blogData.cover_url}
                  alt="Cover"
                  className="h-40 w-full object-cover rounded-md mb-3"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80";
                  }}
                />
              ) : (
                <div className="h-40 w-full mb-3 rounded-md bg-gradient-to-r from-indigo-200 via-sky-200 to-cyan-200 flex items-center justify-center text-indigo-700 font-semibold text-sm">
                  Add cover URL to preview image
                </div>
              )}
              <div className="space-y-2">
                <div>
                  <p className="text-xs uppercase text-indigo-500 font-semibold">{blogData.created_at || "No date yet"}</p>
                  <h4 className="text-2xl font-bold text-slate-800">{blogData.title || "Untitled blog post"}</h4>
                  <p className="text-sm text-slate-500">By {blogData.author || "Anonymous author"}</p>
                </div>
                <p className="text-slate-600">{blogData.summary || "Add a short summary to hook readers."}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {previewTags.length > 0 ? (
                  previewTags.map((tag) => (
                    <span key={tag} className="text-xs rounded-full bg-indigo-100 text-indigo-700 px-2 py-1">
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">No tags yet</span>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-dashed border-indigo-200 p-3 bg-indigo-50 text-sm text-slate-700">
              <p className="font-medium text-indigo-700">Tip:</p>
              <p>Give your blog a strong opening and keep paragraphs short for better readability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
