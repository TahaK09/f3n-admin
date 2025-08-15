import React from "react";
import article_ss from "../assets/article_tutorial.jpg";

function Guides() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Guide to Posting an Article
        </h1>
        <p className="text-gray-700 mb-6">
          This editor allows you to write, format, and publish articles easily.
          Follow the steps below:
        </p>

        <h3 className="text-xl text-start font-semibold text-gray-900 mb-4">
          <span className="text-lg mr-1 text-gray-500 font-normal">1.</span>{" "}
          Writing Your Article
        </h3>
        <p className="text-gray-700 mb-6">
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>
              In the large white editor area on the left, you can start typing
              your content.
            </li>
            <li>
              Use the toolbar at the top to:
              <ol>
                <li>→ Bold, italic, underline text</li>
                <li>→ Add lists, tables, links, and images</li>
                <li>→ Change fonts, text size, and colors</li>
              </ol>
            </li>
          </ul>
        </p>

        <h3 className="text-xl text-start font-semibold text-gray-900 mb-4">
          <span className="text-lg mr-1 text-gray-500 font-normal">2.</span>{" "}
          Uploading an Image
        </h3>
        <p className="text-gray-700 mb-6">
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>
              On the right panel, click the upload icon at the top to add a
              cover image for your article.
            </li>
            <li>
              This image will be displayed prominently on your article page and
              in previews.
            </li>
          </ul>
        </p>

        <h3 className="text-xl text-start font-semibold text-gray-900 mb-4">
          <span className="text-lg mr-1 text-gray-500 font-normal">3.</span>{" "}
          Filling Article Details
        </h3>
        <p className="text-gray-700 mb-6">
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>
              Image Description – Describe what the uploaded image shows (helps
              with SEO and accessibility).
            </li>
            <li>
              Title – The main headline of your article. Keep it clear and
              attention-grabbing.
            </li>
            <li>
              Tags (Separated by commas) – Add relevant keywords (e.g.,
              technology, AI, coding) to help readers find your article.
            </li>
            <li>
              Summary – A short description (2–3 sentences) summarizing your
              article.
            </li>
            <li>Author – Your name or pen name.</li>
            <li>
              Select Category – Choose the main topic your article belongs to
              (e.g., Tech, News, Education).
            </li>
            <li>
              Subcategory – Select a more specific topic under the main
              category.
            </li>
          </ul>
        </p>

        <h3 className="text-xl text-start font-semibold text-gray-900 mb-4">
          <span className="text-lg mr-1 text-gray-500 font-normal">4.</span>{" "}
          Featuring Your Article
        </h3>
        <p className="text-gray-700 mb-6">
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>
              Tick the "Feature this Article" checkbox if you want your article
              to appear at the top of the platform.
            </li>
            <li>Only select this for important or high-priority content.</li>
          </ul>
        </p>

        <h3 className="text-xl text-start font-semibold text-gray-900 mb-4">
          <span className="text-lg mr-1 text-gray-500 font-normal">5.</span>{" "}
          Posting the Article
        </h3>
        <p className="text-gray-700 mb-6">
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>
              Once everything is ready:
              <ul>
                <li>
                  → Click the purple “Post Article” button to publish instantly.
                </li>
                <li>→ Your article will be live for readers.</li>
              </ul>
            </li>
          </ul>
        </p>

        <h3 className="text-xl text-start font-semibold text-gray-900 mb-4">
          <span className="text-lg mr-1 text-gray-500 font-normal">6.</span>{" "}
          Saving a Draft (Coming Soon)
        </h3>
        <p className="text-gray-700 mb-6">
          <ul className="list-disc pl-6 text-gray-700 mb-8">
            <li>
              The "Save Draft" button will let you store your work without
              publishing.
            </li>
            <li>
              This feature is not yet available but will be useful for
              unfinished articles.
            </li>
          </ul>
        </p>

        {/* Image */}
        <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px] rounded-lg">
          <div className="bg-black rounded-lg overflow-hidden">
            <img
              src={article_ss}
              alt="New Project Screenshot"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Guides;
