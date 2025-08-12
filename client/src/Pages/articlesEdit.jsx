import React, { useState, useEffect } from "react";
import ArticlesCard from "../components/custom/articlesCard";
import axios from "axios";

function ArticlesEdit() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_RENDER_SERVER_URL}/api/articles`
        );
        if (res.data.success && res.data.articles) {
          setArticles(res.data.articles);
        }
      } catch (error) {
        console.error("Error fetching Articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Articles Management
        </h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <ArticlesCard
              key={article._id || idx}
              image={article.image_url}
              title={article.title}
              description={article.summary}
              tag={article.tag}
              date={article.createdAt}
              slug={article.slug}
              _id={article._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticlesEdit;
