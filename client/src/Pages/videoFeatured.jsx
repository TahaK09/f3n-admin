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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col gap-5 border border-gray-200"
      >
        <h2 className="text-xl font-medium text-center text-gray-700">
          Feature a Video
        </h2>

        {/* Video Link Input */}
        <input
          type="text"
          name="embed_link"
          value={formData.embed_link}
          onChange={handleChange}
          placeholder="Enter Video Embed Link"
          className="px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none transition"
        />

        {/* Live Preview */}
        {formData.embed_link && (
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-300 shadow-sm">
            <iframe
              src={formData.embed_link}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Tag Input */}
        <input
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          placeholder="Enter Tag"
          className="px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none transition"
        />

        {/* Title Input */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter Video Title"
          className="px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none transition"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-2 w-full py-2 rounded-full text-white font-normal text-base shadow-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default VideoFeatures;
