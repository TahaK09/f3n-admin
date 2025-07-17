import React from "react";

function HomeSection() {
  const pageArr = [
    {
      name: "Add Article",
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
  ];
  return (
    <>
      <div className="w-full h-screen grid grid-cols-3 gap-5 px-96 justify-center items-center">
        {pageArr.map((page, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-1 w-[200px] h-[300px] py-3 px-2.5 border rounded-lg border-gray-400 justify-center items-center cursor-pointer"
          >
            {page.logo}
            <div className="text-lg font-medium text-gray-500">{page.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomeSection;
