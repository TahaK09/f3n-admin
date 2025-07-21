import React, { useState, useEffect } from "react";
import axios from "axios";

function ArticleSection() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    image_url: "",
    category: "",
    subcategory: "",
    author: "",
    tags: "",
    is_featured: false,
    status: "draft",
  });
  const [editId, setEditId] = useState(null);

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/articles/");
      console.log("Response from API:", res.data);
      setArticles(res.data.articles);
    } catch (err) {
      console.error("Failed to fetch articles", err);
      setArticles([]);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()),
    };
    try {
      if (editId) {
        await axios.put(
          `http://localhost:3000/api/articles/${editId}`,
          payload
        );
      } else {
        await axios.post("http://localhost:3000/api/articles/create", payload);
      }

      setForm({
        title: "",
        slug: "",
        summary: "",
        content: "",
        image_url: "",
        category: "",
        subcategory: "",
        author: "",
        tags: "",
        is_featured: false,
        status: "draft",
      });
      setEditId(null);
      fetchArticles();
    } catch (err) {
      console.error("Error submitting article:", err);
    }
  };

  const handleEdit = (article) => {
    setForm({ ...article, tags: article.tags.join(", ") });
    setEditId(article._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/articles/${id}`);
      fetchArticles();
    } catch (err) {
      console.error("Error deleting article:", err);
    }
  };
  return (
    <>
      {/* Form */}
      <div className="max-w-5xl mx-auto p-6 bg-white mt-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">
          {editId ? "Edit Article" : "Create New Article"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            className="p-2 border rounded"
            placeholder="Title *"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="p-2 border rounded"
            placeholder="Slug (optional)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
          <input
            className="p-2 border rounded"
            placeholder="Author *"
            required
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          <input
            className="p-2 border rounded"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <input
            className="p-2 border rounded"
            placeholder="Category *"
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            className="p-2 border rounded"
            placeholder="Subcategory"
            value={form.subcategory}
            onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
          />
          <input
            className="p-2 border rounded col-span-2"
            placeholder="Image URL"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
          <textarea
            className="p-2 border rounded col-span-2"
            rows={3}
            placeholder="Summary"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
          />
          <textarea
            className="p-2 border rounded col-span-2"
            rows={5}
            required
            placeholder="Content *"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          <div className="flex items-center space-x-4">
            <select
              className="border p-2 rounded"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) =>
                  setForm({ ...form, is_featured: e.target.checked })
                }
              />
              <span>Featured</span>
            </label>
          </div>

          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded shadow col-span-2 transition-all duration-200">
            {editId ? "Update Article" : "Publish Article"}
          </button>
        </form>
      </div>

      {/* Articles */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {Array.isArray(articles) &&
          articles.map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all"
            >
              <img
                src={
                  article.image_url ||
                  "https://via.placeholder.com/600x300?text=No+Image"
                }
                alt="Thumbnail"
                className="rounded-t-xl w-full h-48 object-cover"
              />
              <div className="p-4 space-y-1">
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                  {article.category}
                </span>
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {article.summary}
                </p>
                <div className="text-sm text-gray-400">By {article.author}</div>
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleEdit(article)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ArticleSection;
