"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
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

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-10">
      {/* Search Box - Top on mobile, side on desktop */}
      <div className="w-full md:hidden mb-4">
        <div className="flex items-center justify-between gap-2 bg-[#2f3640] rounded-full relative">
          <input
            type="text"
            placeholder="Search Service Here...."
            className="border-none bg-transparent outline-none text-white text-sm px-6 py-3 pr-12 placeholder-white w-full"
          />
          <button className="absolute right-2 w-10 h-10 rounded-full border-0 bg-gradient-to-r from-[#2AF598] to-[#009EFD] flex items-center justify-center text-white hover:shadow-lg transition-all duration-300">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Top Part */}
      <div className="flex flex-col md:flex-row justify-between w-full items-start md:items-center gap-4 py-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-serif">
          Hello, {name} 👋
        </h1>

        {/* Search box for desktop */}
        <div className="hidden md:block w-full md:w-auto max-w-md">
          <div className="flex items-center justify-between gap-2 bg-[#2f3640] rounded-full relative">
            <input
              type="text"
              placeholder="Search Service Here...."
              className="border-none bg-transparent outline-none text-white text-sm px-6 py-3 pr-12 placeholder-white w-full"
            />
            <button className="absolute right-2 w-10 h-10 rounded-full border-0 bg-gradient-to-r from-[#2AF598] to-[#009EFD] flex items-center justify-center text-white hover:shadow-lg transition-all duration-300">
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Category Grid Section */}
      <div className="mt-6 font-semibold">
        <h1 className="text-xl md:text-2xl mb-4">Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4 lg:gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 md:p-4 
                 bg-white text-black 
                 dark:bg-gray-800 dark:text-white 
                 shadow-md dark:shadow-[0_4px_10px_rgba(255,255,255,0.2)] 
                 rounded-xl hover:shadow-2xl cursor-pointer transition-all duration-200
                 hover:scale-105 active:scale-95"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-12 h-12 md:w-16 md:h-16 mb-2"
              />
              <span className="text-xs md:text-sm font-medium text-center leading-tight">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Services */}
      <div className="text-xl md:text-2xl font-semibold mt-8 relative">
        <h1 className="mb-4">Popular Services</h1>

        {/* Left scroll button */}
        <button
          onClick={scrollLeft}
          className="hidden md:block absolute top-1/2 left-2 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-600 dark:text-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {popularServices.map((service) => (
            <div
              key={service._id}
              className="min-w-[200px] sm:min-w-[220px] md:min-w-[250px] bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-md p-3 flex-shrink-0 hover:shadow-lg transition-shadow"
              onClick={() => {
                console.log(
                  "clicked service is ",
                  service,
                  "id is ",
                  service._id
                );
                Router.push(`/customer/services/${service._id}`);
              }}
            >
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/054/039/938/small_2x/two-workers-in-blue-uniforms-converse-in-front-of-a-house-surrounded-by-containers-emphasizing-home-service-and-maintenance-png.png"
                alt={service.name}
                className="w-full h-32 md:h-40 object-cover rounded-lg"
              />
              <h3 className="mt-2 font-semibold text-sm md:text-base overflow-hidden text-ellipsis whitespace-nowrap">
                {service.title}
              </h3>
              <p className="font-bold text-sm md:text-base text-green-600 dark:text-green-400">
                {service.price}
              </p>
              <button
                className="w-full bg-gray-200 dark:bg-gray-700 text-red-400 border border-gray-400 border-b-4 mt-2 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group text-sm md:text-base"
                onClick={() => Router.push(`/customer/services/${service._id}`)}
              >
                <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={scrollRight}
          className="hidden md:block absolute top-1/2 right-2 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-600 dark:text-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
