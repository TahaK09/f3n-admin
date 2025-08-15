import React, { useState } from "react";
import ImageUploadButton from "../custom/imageUploadBtn";
import { toast } from "react-hot-toast";
import axios from "axios";

function ImageSection() {
  const [imageUploading, setImageUploading] = useState(false);
  const [imgUploadSuc, setImgUploadSuc] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    image_url: "",
    description: "",
    title: "",
  });

  // Handle Image Upload to Cloudinary
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please upload a proper image!");
      return;
    }

    setImageUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "stories");
    data.append("cloud_name", "dwrhlxmd6");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwrhlxmd6/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const imageURL = await res.json();

      if (imageURL.url) {
        setFormData((prev) => ({
          ...prev,
          image_url: imageURL.url,
        }));
        setImgPreview(imageURL.url);
        setImgUploadSuc(true);
        toast.success("Image uploaded!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch {
      toast.error("Failed to upload image. Please try again!");
    } finally {
      setImageUploading(false);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Story
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.image_url ||
        !formData.title.trim() ||
        !formData.description.trim()
      ) {
        toast.error("Please fill all required fields!");
        setLoading(false);
        return;
      }

      await axios.post(`http://localhost:3000/api/stories/add`, formData);

      toast.success("Story uploaded successfully");

      setFormData({
        image_url: "",
        description: "",
        title: "",
      });
      setImgUploadSuc(false);
      setImgPreview("");
    } catch (err) {
      toast.error("Error uploading Story!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <form
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-4 sm:p-8 flex flex-col gap-5 border border-gray-200"
        onSubmit={handleSubmit}
      >
        {/* Image Upload */}
        <div className="w-full">
          {imgUploadSuc ? (
            <div className="relative w-full rounded-lg overflow-hidden shadow-md">
              <img
                src={imgPreview}
                alt="Uploaded preview"
                className="w-full h-auto object-cover"
              />

              {/* Overlay with Inputs */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 flex flex-col gap-2">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 font-bold text-white bg-transparent border-b border-white/50 focus:outline-none text-lg"
                />
                <textarea
                  name="description"
                  placeholder="Enter description"
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-white bg-transparent border-b border-white/50 focus:outline-none resize-none text-sm"
                />
              </div>
            </div>
          ) : (
            <>
              <label className="block text-lg text-gray-700 font-medium mb-2">
                Upload Story
              </label>
              <ImageUploadButton
                onChange={handleUpload}
                accept="image/*"
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition cursor-pointer"
              />
              {imageUploading && (
                <p className="text-sm text-gray-500 mt-1">Uploading Image...</p>
              )}
            </>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-full text-white font-medium text-base shadow-md transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-violet-600 hover:bg-violet-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
}

export default ImageSection;
