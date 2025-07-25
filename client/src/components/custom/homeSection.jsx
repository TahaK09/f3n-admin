import React from "react";
import { NavLink } from "react-router-dom";

function HomeSection() {
  const pageArr = [
    {
      name: "Add Article",
      link: "/add-articles",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#000000"
          height="100px"
          width="100px"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 500 500"
          enable-background="new 0 0 500 500"
          xml:space="preserve"
        >
          <path d="M306,192h-48v-48c0-4.4-3.6-8-8-8s-8,3.6-8,8v48h-48c-4.4,0-8,3.6-8,8s3.6,8,8,8h48v48c0,4.4,3.6,8,8,8s8-3.6,8-8v-48h48  c4.4,0,8-3.6,8-8S310.4,192,306,192z" />
        </svg>
      ),
    },
    {
      name: "Edit Article",
      link: "edit-article",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#000000"
          height="100px"
          width="100px"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 500 500"
          enable-background="new 0 0 500 500"
          xml:space="preserve"
        >
          <g>
            <path d="M306,184c-4.4,0-8,3.6-8,8v48.1c0,4.3-3.5,7.9-7.9,7.9h-80.2c-4.3,0-7.9-3.5-7.9-7.9v-80.2c0-4.3,3.5-7.9,7.9-7.9H258   c4.4,0,8-3.6,8-8s-3.6-8-8-8h-48.1c-13.2,0-23.9,10.7-23.9,23.9v80.3c0,13.2,10.7,23.9,23.9,23.9h80.3c13.2,0,23.9-10.7,23.9-23.9   V192C314,187.6,310.4,184,306,184z" />
            <path d="M232.3,217.7c1.6,1.6,3.6,2.3,5.7,2.3s4.1-0.8,5.7-2.3l64-64c3.1-3.1,3.1-8.2,0-11.3s-8.2-3.1-11.3,0l-64,64   C229.2,209.5,229.2,214.5,232.3,217.7z" />
          </g>
        </svg>
      ),
    },
    {
      name: "Image Gallery",
      link: "image-gallery",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#000000"
          height="100px"
          width="100px"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 500 500"
          enable-background="new 0 0 500 500"
          xml:space="preserve"
        >
          <g>
            <path d="M305.9,119.7h-112c-13.2,0-24,10.8-24,24v112c0,13.2,10.8,24,24,24h112c13.2,0,24-10.8,24-24v-112   C329.9,130.5,319.1,119.7,305.9,119.7z M312.9,259.5l-36.3-35.2l13.3-13.3c2.1-2.1,5.9-2.1,8,0l16,16v28.7   C313.9,257.1,313.5,258.4,312.9,259.5z M193.9,135.7h112c4.4,0,8,3.6,8,8v60.7l-4.7-4.7c-8.4-8.5-22.2-8.5-30.7,0l-13.5,13.5   l-23.9-23.1c-8.5-8.5-22.2-8.5-30.5-0.2l-24.8,23.3v-69.5C185.9,139.3,189.5,135.7,193.9,135.7z M185.9,255.7v-20.5l36-33.8   c2.1-2.1,5.8-2.2,8.1,0.1l64.3,62.2H193.9C189.5,263.7,185.9,260.2,185.9,255.7z" />
            <circle cx="269.9" cy="171.7" r="12" />
          </g>
        </svg>
      ),
    },
    {
      name: "Promotions",
      link: "promotions",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#000000"
          height="100px"
          width="100px"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 500 500"
          enable-background="new 0 0 500 500"
          xml:space="preserve"
        >
          <path d="M306,120H194c-13.2,0-24,10.8-24,24v112c0,13.2,10.8,24,24,24h112c13.2,0,24-10.8,24-24V144C330,130.8,319.2,120,306,120z   M298,168h16v24h-16V168z M282,192h-64v-56h64V192z M202,192h-16v-24h16V192z M186,208h16v24h-16V208z M218,208h64v56h-64V208z   M298,208h16v24h-16V208z M314,144v8h-16v-16h8C310.4,136,314,139.6,314,144z M194,136h8v16h-16v-8C186,139.6,189.6,136,194,136z   M186,256v-8h16v16h-8C189.6,264,186,260.4,186,256z M306,264h-8v-16h16v8C314,260.4,310.4,264,306,264z" />
        </svg>
      ),
    },
    {
      name: "Add Links",
      link: "add-links",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g opacity="0.5">
            <path
              d="M19.99 3.99115C18.4373 2.46996 16.3087 2.41193 15.2253 3.4733L11.5252 7.09827C11.2294 7.38815 10.7545 7.38328 10.4646 7.0874C10.1748 6.79152 10.1796 6.31667 10.4755 6.02679L14.1756 2.40182C16.0115 0.603153 19.0893 1.00883 21.0397 2.91967C22.9928 4.8332 23.4181 7.87522 21.5683 9.68753L18.6611 12.5357C18.3652 12.8256 17.8904 12.8208 17.6005 12.5249C17.3106 12.229 17.3155 11.7542 17.6113 11.4643L20.5185 8.61605C21.588 7.56832 21.5399 5.50967 19.99 3.99115Z"
              fill="#1C274C"
            />
            <path
              d="M6.72792 12.506C7.00738 12.2003 6.98606 11.7259 6.68032 11.4464C6.37457 11.167 5.90018 11.1883 5.62073 11.494L4.35987 12.8735C2.63303 14.7628 3.01021 17.9268 4.86421 19.9552C6.72938 21.9958 9.73466 22.4595 11.5192 20.507L15.554 16.0926C15.8334 15.7869 15.8121 15.3125 15.5064 15.033C15.2006 14.7536 14.7262 14.7749 14.4468 15.0806L10.412 19.495C9.41116 20.59 7.44876 20.5596 5.97141 18.9432C4.4829 17.3147 4.40847 15.0437 5.46706 13.8855L6.72792 12.506Z"
              fill="#1C274C"
            />
          </g>
          <path
            d="M6.62424 3.58393C6.39448 3.23929 5.92882 3.14616 5.58418 3.37592C5.23953 3.60568 5.1464 4.07134 5.37617 4.41598L7.37617 7.41598C7.60593 7.76063 8.07158 7.85376 8.41623 7.624C8.76088 7.39423 8.85401 6.92858 8.62424 6.58393L6.62424 3.58393Z"
            fill="#1C274C"
          />
          <path
            d="M2.23737 7.28845C1.84442 7.15746 1.41968 7.36983 1.28869 7.76279C1.15771 8.15574 1.37008 8.58048 1.76303 8.71147L7.76303 10.7115C8.15599 10.8425 8.58073 10.6301 8.71172 10.2371C8.8427 9.84417 8.63033 9.41943 8.23737 9.28845L2.23737 7.28845Z"
            fill="#1C274C"
          />
        </svg>
      ),
    },
    {
      name: "Featured Video",
      link: "featured-video",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40px"
          height="40px"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 2H0V14H16V2ZM6.5 5V11H7.5L11 8L7.5 5H6.5Z"
            fill="#000000"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pageArr.map((page, idx) => (
            <NavLink
              key={idx}
              to={page.link}
              className="flex flex-col gap-1 w-[200px] h-[300px] py-3 px-2.5 rounded-xl shadow-md border border-gray-200 hover:scale-110 transition-all shadow-gray-300 justify-center items-center cursor-pointer"
            >
              {page.logo}
              <div className="text-lg font-medium text-gray-500">
                {page.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeSection;
