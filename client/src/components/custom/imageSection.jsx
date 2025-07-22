import React from "react";
import ImageUploadButton from "../custom/imageUploadBtn";

function ImageSection() {
  return (
    <>
      <section className="image-section w-2xl rounded-lg p-2.5 bg-white border border-gray-200 mx-auto mt-20">
        <form className="flex flex-col gap-2">
          <ImageUploadButton />

          <div className="form-group">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter title"
              className="input-full w-full px-2 py-1 border border-gray-200 rounded-md"
            />
          </div>
          <div className="form-group">
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              rows={4}
              className="input-full w-full px-2 py-1 border border-gray-200 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="submit-btn bg-blue-500 text-white text-base py-1 px-2 rounded-sm"
          >
            Submit
          </button>
        </form>
      </section>
      {/* Preview of the image in the side */}
    </>
  );
}

export default ImageSection;
