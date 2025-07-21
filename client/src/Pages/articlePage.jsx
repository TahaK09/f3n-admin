import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { Textarea } from "@/components/ui/textarea";
import ImageUploadButton from "../components/custom/imageUploadButton";
import toast from "react-hot-toast";

function Article() {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    author: "",
    content: "",
    category: "",
    date: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false); // New
  const editor = useRef(null);

  useEffect(() => {
    // Auto-load draft if exists
    const savedDraft = localStorage.getItem("blogData");
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
      toast.success("Loaded saved draft!");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUploading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "intl_blog_image");
      data.append("cloud_name", "duqdylsde");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/duqdylsde/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const imageURL = await res.json();

        if (imageURL.url) {
          setFormData((prev) => ({
            ...prev,
            image: imageURL.url,
          }));
          toast.success("Image uploaded!");
        } else {
          toast.error("Image upload failed!");
        }
      } catch (error) {
        toast.error("Failed to upload image. Please try again!");
      }
      setImageUploading(false);
    } else {
      toast.error("Please upload a proper image!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.image ||
        !formData.title.trim() ||
        !formData.content.trim() ||
        !formData.author.trim() ||
        !formData.category.trim()
      ) {
        toast.error("Please fill in all required fields!");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_RENDER_API}/admin/blogs/add`,
        {
          img: formData.image,
          title: formData.title,
          description: formData.description,
          author: formData.author,
          content: formData.content,
          category: formData.category,
          date: new Date().toISOString(),
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Blog posted successfully!");
        setFormData({
          image: "",
          title: "",
          description: "",
          author: "",
          content: "",
          category: "",
          date: new Date(),
        });
        localStorage.removeItem("blogData"); // Clear draft after posting
      } else {
        toast.error(res.data.message || "Upload failed!");
      }
    } catch (err) {
      toast.error("Error uploading blog!");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div className="bg-white rounded-xl border border-gray-200 items-center shadow-md min-h-[700px] p-6 w-full max-w-[1300px] flex flex-col lg:flex-row gap-6">
        {/* Editor Section */}
        <div className="flex-1 w-full h-full">
          <JoditEditor
            ref={editor}
            value={formData.content}
            onChange={(newContent) =>
              setFormData((prevData) => ({
                ...prevData,
                content: newContent,
              }))
            }
            placeholder="Write your blog content here..."
            className="rounded-md border h-full overflow-scroll"
          />
        </div>

        {/* Side Form Section */}
        <div className="w-full lg:w-[350px] flex flex-col self-start gap-4">
          {/* Image Upload */}
          <div>
            <label className="text-lg text-[#535353] font-medium block mb-2">
              Upload Image
            </label>
            <ImageUploadButton onChange={handleUpload} />
            {imageUploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading Image...</p>
            )}
          </div>

          {/* Input Fields */}
          <input
            className="outline-none rounded-md border border-gray-500/40 p-2"
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />

          <Textarea
            className="outline-none rounded-md border border-gray-500/40 p-2"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short Description"
          />

          <input
            className="outline-none rounded-md border border-gray-500/40 p-2"
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
          />

          <input
            className="outline-none rounded-md border border-gray-500/40 p-2"
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-2 text-sm transition"
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Posting..." : "Post Blog"}
          </button>

          {/* Save Draft Button (localStorage only) */}
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white rounded-full py-2 text-sm transition"
            type="button"
            disabled={loading}
            onClick={() => {
              localStorage.setItem("blogData", JSON.stringify(formData));
              toast.success("Draft saved locally!");
            }}
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}

export default Article;
