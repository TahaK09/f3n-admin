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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    <section className="image-section w-2xl rounded-lg p-2.5 bg-white border border-gray-200 mx-auto mt-20">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="w-full h-full">
          {imgUploadSuc ? (
            <img
              className="w-auto h-full"
              src={imgPreview}
              alt="image preview"
            />
          ) : (
            <>
              <label className="text-lg text-[#535353] font-medium block mb-2">
                Upload Image
              </label>
              <ImageUploadButton onChange={handleUpload} />
              {imageUploading && (
                <p className="text-sm text-gray-500 mt-1">Uploading Image...</p>
              )}
            </>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            className="input-full w-full px-2 py-1 border border-gray-200 rounded-md"
          />
        </div>
        <div className="form-group">
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="input-full w-full px-2 py-1 border border-gray-200 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="submit-btn bg-blue-500 text-white text-base py-1 px-2 rounded-sm"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
}

export default ImageSection;
