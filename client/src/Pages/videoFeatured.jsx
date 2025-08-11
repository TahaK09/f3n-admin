import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function VideoFeatures() {
  const [formData, setFormData] = useState({
    embed_link: "",
    tag: "",
    title: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.embed_link.trim() ||
        !formData.title.trim() ||
        !formData.tag.trim()
      ) {
        toast.error("Please fill in all required fields!");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_RENDER_SERVER_URL}/api/featuredvideo/add`,
        formData
      );

      if (res.data.success) {
        toast.success(res.data.message || "Video featured successfully!");
        setFormData({ embed_link: "", tag: "", title: "" });
      } else {
        toast.error(res.data.message || "Upload failed!");
      }
    } catch (err) {
      toast.error("Error Featuring Video!");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="w-96 h-auto bg-white border border-gray-600 shadow-sm flex flex-col gap-2 px-3 py-5 rounded-xl mx-auto mt-10">
      <input
        type="text"
        name="embed_link"
        value={formData.embed_link}
        onChange={handleChange}
        placeholder="Video Link"
        className="px-3 py-2 rounded-md border border-gray-300 text-lg"
      />
      <input
        type="text"
        name="tag"
        value={formData.tag}
        onChange={handleChange}
        placeholder="Tag"
        className="px-3 py-2 rounded-md border border-gray-300 text-lg"
      />
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="px-3 py-2 rounded-md border border-gray-300 text-lg"
      />
      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className={`px-2 py-1 rounded-lg text-lg text-white ${
          loading ? "bg-gray-400" : "bg-violet-600"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default VideoFeatures;
