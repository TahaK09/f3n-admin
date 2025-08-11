import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { Textarea } from "@/components/ui/textarea";
import ImageUploadButton from "../components/custom/imageUploadBtn";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function Article() {
  const [formData, setFormData] = useState({
    image_url: "",
    imgDescription: "",
    title: "",
    summary: "",
    tags: "",
    author: "",
    content: "",
    category: "",
    subcategory: "",
    is_featured: false,
    status: "Published",
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false); // New
  const editor = useRef(null);
  const [imgPreview, setImgPreview] = useState("");
  const [imgUploadSuc, setImgUploadSuc] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUploading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "thumbnail_f3n");
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
          toast.success("Image uploaded!");
          setImgPreview(imageURL.url);
          setImgUploadSuc(true);
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
        !formData.image_url ||
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
        `${import.meta.env.VITE_RENDER_SERVER_URL}/api/articles/create`,
        {
          image_url: formData.image_url,
          title: formData.title,
          imgDescription: formData.imgDescription,
          summary: formData.summary,
          author: formData.author,
          content: formData.content,
          category: formData.category,
          subcategory: formData.subcategory,
          tags: formData.tags,
          is_featured: formData.is_featured,
          status: formData.status,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Article posted successfully!");
        setFormData({
          image_url: "",
          title: "",
          imgDescription: "",
          description: "",
          author: "",
          content: "",
          category: "",
          date: new Date(),
        });
        setImgUploadSuc(false);
        localStorage.removeItem("blogData"); // Clear draft after posting
      } else {
        toast.error(res.data.message || "Upload failed!");
      }
    } catch (err) {
      toast.error("Error posting Article!");
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white items-center min-h-[700px] px-20 py-6 w-full flex flex-col lg:flex-row gap-6">
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
            placeholder="Write your Article here..."
            className="rounded-md border h-full overflow-scroll"
          />
        </div>

        {/* Side Form Section */}
        <div className="w-full lg:w-[350px] flex flex-col self-start gap-4">
          {/* Image Upload */}
          <div className="w-full h-full">
            {imgUploadSuc && (
              <img
                className="w-auto h-full"
                src={imgPreview}
                alt="image preview"
              />
            )}
            {!imgUploadSuc && (
              <div>
                <label className="text-lg text-[#535353] font-medium block mb-2">
                  Upload Image
                </label>
                <ImageUploadButton onChange={handleUpload} />
                {imageUploading && (
                  <p className="text-sm text-gray-500 mt-1">
                    Uploading Image...
                  </p>
                )}
              </div>
            )}
          </div>
          {/* Image Description */}
          <input
            className="outline-none rounded-md border border-gray-500/40 p-2"
            type="text"
            name="imgDescription"
            placeholder="Image Description"
            value={formData.imgDescription}
            onChange={handleChange}
          />
          {/* Title */}
          <input
            className="outline-none rounded-md border border-gray-500/40 p-2"
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />

          {/* Tags */}
          <input
            className="outline-none rounded-md border border-gray-500/40 p-2"
            type="text"
            name="tags"
            placeholder="Tags (Seperated by commas)"
            value={formData.tags}
            onChange={handleChange}
          />

          <Textarea
            className="outline-none rounded-md border border-gray-500/40 p-2"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Summary"
          />

          <input
            className="outline-none rounded-md border border-gray-500/40 p-2"
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
          />
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData((prevData) => ({ ...prevData, category: value }))
            }
          >
            <SelectTrigger className="w-full outline-none rounded-md border border-gray-500/40 bg-white text-gray-600">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-white outline-none">
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="opinion">Opinion</SelectItem>
                <SelectItem value="world">World</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* is featured */}
          {/* This is currently not working! */}
          <Label
            value={formData.is_featured}
            onValueChange={(value) =>
              setFormData((prevData) => ({ ...prevData, is_featured: value }))
            }
            className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
          >
            <Checkbox
              id="toggle-2"
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">
                Feature this Article
              </p>
              <p className="text-muted-foreground text-sm">
                By checking this box, your article will be featured on the top
                of the platform.
              </p>
            </div>
          </Label>

          {/* Submit Button */}
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-2 text-sm transition"
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Posting..." : "Post Article"}
          </button>

          {/* Save Draft Button (localStorage only) */}
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white rounded-full py-2 text-sm transition"
            type="button"
            disabled={loading}
            onClick={handleSubmit}
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}

export default Article;
