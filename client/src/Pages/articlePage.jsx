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
    image: "",
    title: "",
    description: "",
    tags: "",
    author: "",
    content: "",
    category: "",
    is_Featured: false,
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
        toast.success(res.data.message || "Article posted successfully!");
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
      toast.error("Error posting Article!");
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
          <div>
            <label className="text-lg text-[#535353] font-medium block mb-2">
              Upload Image
            </label>
            <ImageUploadButton onChange={handleUpload} />
            {imageUploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading Image...</p>
            )}
          </div>

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

          <Label
            value={formData.is_Featured}
            onValueChange={(value) =>
              setFormData((prevData) => ({ ...prevData, is_Featured: value }))
            }
            className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
          >
            <Checkbox
              id="toggle-2"
              defaultChecked
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
