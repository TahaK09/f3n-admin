import React from "react";
import tutorialSVG from "../assets/tutorials.svg";
import bookSVG from "../assets/guides.svg";
import { Link } from "react-router-dom";

function Tutorials() {
  const docsSections = [
    {
      title: "Tutorials",
      description:
        "Deploy in minutes. Jump into our quickstart guide or deploy with your favorite stack below.",
      icon: tutorialSVG,
      bg: "from-[#95d0b440] to-[#fff]",
    },
    {
      title: "Quickstart",
      link: "guides",
      description:
        "Deploy in minutes. Jump into our quickstart guide or deploy with your favorite stack below.",
      icon: bookSVG,
      bg: "from-[#f1c1c040] to-[#fff]",
    },
  ];
  return (
    <>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          F3News Admin Tutorials
        </h2>
        <p className="text-gray-600 mb-10">
          Find user guides, quickstarts, tutorials, use cases, deploy templates,
          functions and more.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {docsSections.map((section, index) => (
            <Link
              to={`${section.link}`}
              key={index}
              className={`${section.bg} bg-gradient-to-br border border-[#f4f4f6] rounded-lg transition`}
            >
              <div className="p-6">
                <h3 className="text-lg text-gray-800 font-semibold mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-500 font-normal text-base w-[60%]">
                  {section.description}
                </p>
              </div>
              <div className="flex w-full justify-end items-end -mt-28">
                <img src={section.icon} alt="" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Tutorials;
