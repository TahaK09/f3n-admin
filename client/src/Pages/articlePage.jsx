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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";

function Article() {
  const { _id } = useParams();

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
    status: "published",
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const editor = useRef(null);
  const [imgPreview, setImgPreview] = useState("");
  const [imgUploadSuc, setImgUploadSuc] = useState(false);

  // Fetch article data if editing (_id exists)
  useEffect(() => {
    if (!_id) return; // no fetch if no id (create mode)

    const fetchArticle = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_RENDER_SERVER_URL}/api/articles/id/${_id}`
        );
        if (res.data.success) {
          const article = res.data.article;

          setFormData({
            image_url: article.image_url || "",
            imgDescription: article.imgDescription || "",
            title: article.title || "",
            summary: article.summary || "",
            tags: Array.isArray(article.tags) ? article.tags.join(", ") : "",
            author: article.author || "",
            content: article.content || "",
            category: article.category || "",
            subcategory: article.subcategory || "",
            is_featured: article.is_featured || false,
            status: article.status || "published",
          });
          setImgPreview(article.image_url || "");
          setImgUploadSuc(Boolean(article.image_url));
        }
      } catch (error) {
        console.error("Error fetching Article:", error);
        toast.error("Failed to fetch article data.");
      }
    };

    fetchArticle();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please upload a proper image!");
      return;
    }

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

      let res;
      if (_id) {
        // Update existing article
        res = await axios.put(
          `${import.meta.env.VITE_RENDER_SERVER_URL}/api/articles/id/${_id}`,
          {
            ...formData,
          }
        );
        console.log(formData);
      } else {
        // Create new article
        res = await axios.post(
          `${import.meta.env.VITE_RENDER_SERVER_URL}/api/articles/create`,
          {
            ...formData,
          }
        );
      }

      if (res.data.success) {
        toast.success(
          res.data.message || (_id ? "Article updated!" : "Article posted!")
        );
        if (!_id) {
          setFormData({
            image_url: "",
            imgDescription: "",
            title: "",
            summary: "",
            author: "",
            content: "",
            category: "",
            subcategory: "",
            tags: "",
            is_featured: false,
            status: "published",
          });
          setImgUploadSuc(false);
          setImgPreview("");
        }
      } else {
        toast.error("Unknown Error Occured!");
      }
    } catch (err) {
      toast.error("Error submitting article!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white items-center min-h-[800px] px-20 py-6 w-full flex flex-col lg:flex-row gap-6"
      >
        {/* Editor Section */}
        <div className="flex-1 w-[90vw] lg:w-full h-full">
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
        <div className="w-[350px] flex flex-col self-start gap-4">
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
                  <p className="text-sm text-gray-500 mt-1">
                    Uploading Image...
                  </p>
                )}
              </>
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
            required
          />

          {/* Tags */}
          <input
            className="outline-none rounded-md border border-gray-500/40 p-2"
            type="text"
            name="tags"
            placeholder="Tags (Separated by commas)"
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
            required
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

          <Select
            value={formData.subcategory}
            onValueChange={(value) =>
              setFormData((prevData) => ({ ...prevData, subcategory: value }))
            }
          >
            <SelectTrigger className="w-full outline-none rounded-md border border-gray-500/40 bg-white text-gray-600">
              <SelectValue placeholder="Subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-white outline-none">
                <SelectItem value="startups">Startups</SelectItem>
                <SelectItem value="gadgets">Gadgets</SelectItem>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="cricket">Cricket</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="movies">Movies</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="celebrities">Celebrities</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="crime">Crime</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label
            htmlFor="toggle-2"
            className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 
              has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50
              dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
          >
            <Checkbox
              id="toggle-2"
              checked={formData.is_featured}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  is_featured: checked === true, // Ensure boolean
                }))
              }
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 
                data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 
                dark:data-[state=checked]:bg-blue-700"
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
          >
            {loading
              ? _id
                ? "Updating..."
                : "Posting..."
              : _id
              ? "Update Article"
              : "Post Article"}
          </button>

          {/* Save Draft Button (disabled for now) */}
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white rounded-full py-2 text-sm transition"
            type="button"
            disabled
          >
            Save Draft (Coming soon)
          </button>
        </div>
      </form>
    </div>
  );
}

export default Article;
