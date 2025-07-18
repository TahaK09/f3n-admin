import React from "react";

function VideoFeatures() {
  return (
    <>
      {/* Tag, Title, and Link */}
      <div className="w-96 h-auto bg-white border border-gray-600 shadow-sm flex flex-col gap-2 px-3 py-5 rounded-xl mx-auto mt-10">
        <input
          type="text"
          placeholder="Video Link"
          className="px-3 py-2 rounded-md  border border-gray-300 text-lg"
        />
        <input
          type="text"
          placeholder="Tag"
          className="px-3 py-2 rounded-md border border-gray-300 text-lg"
        />
        <input
          type="text"
          placeholder="Title"
          className="px-3 py-2 rounded-md border border-gray-300 text-lg"
        />
        <input
          type="button"
          value="Submit"
          className="px-2 py-1 bg-violet-600 text-white text-lg rounded-lg"
        />
      </div>
    </>
  );
}

export default VideoFeatures;
