"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [name, setName] = useState("");
  const [popularServices, setPopularServices] = useState([]);
  const Router = useRouter();

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await axios.get("/api/services");
        const data = res.data;
        if (data.success) {
          setPopularServices(data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchServices();
  }, []);

  useEffect(() => {
    async function fetchName() {
      try {
        const res = await axios.get("/api/get-name");
        const data = res.data;
        if (data.success) {
          setName(data.name);
        } else {
          console.error("Error fetching name:", data.message);
        }
      } catch (err) {
        console.error("Request failed:", err);
      }
    }
    if (name === "") {
      // Fetch name only if not already set
      fetchName();
    }
  }, [name, setName]);

  const categories = [
    {
      name: "Plumbing",
      image: "https://img.icons8.com/color/96/plumber.png",
    },
    {
      name: "Electrician",
      image: "https://img.icons8.com/color/96/electrical.png",
    },
    {
      name: "Cleaning",
      image: "https://img.icons8.com/color/96/broom.png",
    },
    {
      name: "Carpentry",
      image: "https://img.icons8.com/color/96/hammer.png",
    },
    {
      name: "Painting",
      image: "https://img.icons8.com/color/96/paint-palette.png",
    },
    {
      name: "Appliance Repair",
      image: "https://img.icons8.com/color/96/appliances.png",
    },
    {
      name: "Beauty & Salon",
      image: "https://img.icons8.com/color/96/barbershop.png",
    },
    {
      name: "AC Services",
      image: "https://img.icons8.com/color/96/air-conditioner.png",
    },
  ];

  const scrollRef = useRef(null);
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  console.log(popularServices);
  const service = popularServices[0];
  return (
    <div>
      {/* Top Part  */}
      <div className="flex justify-between w-full items-center">
        <h1 className="ml-10 text-center text-2xl font-serif">
          Hello, {name} 👋
        </h1>
        {/* search box  */}
        <div className="w-5/10 mt-2 ">
          <div className="flex max-w-95/100 items-center justify-between gap-2 bg-[#2f3640] rounded-full relative">
            <input
              type="text"
              placeholder="Search Service Here...."
              className="border-none bg-transparent outline-none text-white text-sm px-6 py-6 pr-12 placeholder-white"
            />
            <button className="absolute right-2 w-12 h-12 rounded-full border-0 bg-gradient-to-r from-[#2AF598] to-[#009EFD] flex items-center justify-center text-white transition-all duration-300 ease-[cubic-bezier(.23,1,0.32,1)] hover:bg-[#1A1A1A] hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:-translate-y-[3px] active:shadow-none active:translate-y-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <g clipPath="url(#clip0_2_17)">
                  <g filter="url(#filter0_d_2_17)">
                    <path
                      d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      shapeRendering="crispEdges"
                    ></path>
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_2_17"
                    x="-0.418549"
                    y="3.70435"
                    width="29.7139"
                    height="29.7139"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood
                      floodOpacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dy="4"></feOffset>
                    <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2_17"
                    ></feBlend>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2_17"
                      result="shape"
                    ></feBlend>
                  </filter>
                  <clipPath id="clip0_2_17">
                    <rect
                      width="28.0702"
                      height="28.0702"
                      fill="white"
                      transform="translate(0.403503 0.526367)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category Grid Section */}
      <div className="mt-5 ml-10 font-semibold">
        <h1 className="text-2xl">Categories</h1>
        <div className="grid grid-cols-8 gap-6 p-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 
                 bg-white text-black 
                 dark:bg-gray-800 dark:text-white 
                 shadow-md dark:shadow-[0_4px_10px_rgba(255,255,255,0.2)] 
                 rounded-xl hover:shadow-2xl cursor-pointer transition"
            >
              <img src={cat.image} alt={cat.name} className="w-16 h-16 mb-2" />
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Services0 */}
      <div className="ml-10 text-2xl font-semibold mt-5">
        <h1>Popular Services</h1>
        <button
          onClick={scrollLeft}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-400 dark:text-black mt-40 shadow-md rounded-full p-2 z-10"
        >
          <ChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth mt-3 scrollbar-hidden"
        >
          {popularServices.map((service) => (
            <div
              key={service._id}
              className="min-w-[250px] bg-white dark:text-black rounded-xl shadow-md p-3 flex-shrink-0"
            >
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/054/039/938/small_2x/two-workers-in-blue-uniforms-converse-in-front-of-a-house-surrounded-by-containers-emphasizing-home-service-and-maintenance-png.png"
                alt={service.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-2 font-semibold">{service.title}</h3>
              <p className="font-bold">{service.price}</p>
              <button
                className="bg-gray-200 text-red-400 border border-gray-400 border-b-4 mt-2 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                onClick={() => Router.push(`/customer/services/${service._id}`)}
              >
                <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Book Nows
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute top-1/2 right-2 mt-38 -translate-y-1/2 bg-gray-400 dark:text-black shadow-md rounded-full p-2"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Home;
