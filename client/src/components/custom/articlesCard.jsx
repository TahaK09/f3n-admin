import React from "react";
import { Navigate } from "react-router-dom";

function ArticlesCard({ image, title, description, date, slug }) {
  const OpenSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="#ffffff"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
    </svg>
  );

  const EditSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="#ffffff"
    >
      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
    </svg>
  );

  return (
    <div className="max-w-sm bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Image with overlay icons */}
      <div className="relative">
        {image && (
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        )}

        {/* Icon container */}
        <div className="absolute top-2 right-2 flex gap-2">
          <a
            href={`${import.meta.env.VITE_WEBSITE_URL}/india/article/${slug}`}
            target="_blank"
            className="bg-black/50 p-1 rounded-full hover:bg-black/70 transition hover:none"
            title="Open Article"
          >
            {OpenSvg}
          </a>
          <button
            onClick={<Navigate to="/" replace={true} />}
            className="bg-black/50 p-1 rounded-full hover:bg-black/70 transition"
            title="Edit Article"
          >
            {EditSvg}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 hover:text-violet-600 cursor-pointer">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        )}

        {date && (
          <span className="text-xs text-gray-400 mt-1">
            {new Date(date).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}

export default ArticlesCard;
