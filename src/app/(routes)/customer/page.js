// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { ChevronLeft, ChevronRight, Search } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const [name, setName] = useState("");
//   const [popularServices, setPopularServices] = useState([]);
//   const Router = useRouter();

//   useEffect(() => {
//     async function fetchServices() {
//       try {
//         const res = await axios.get("/api/services");
//         const data = res.data;
//         if (data.success) {
//           setPopularServices(data.data);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//     fetchServices();
//   }, []);

//   useEffect(() => {
//     async function fetchName() {
//       try {
//         const res = await axios.get("/api/get-name");
//         const data = res.data;
//         if (data.success) {
//           setName(data.name);
//         } else {
//           console.error("Error fetching name:", data.message);
//         }
//       } catch (err) {
//         console.error("Request failed:", err);
//       }
//     }
//     if (name === "") {
//       fetchName();
//     }
//   }, [name, setName]);

//   const categories = [
//     {
//       name: "Plumbing",
//       image: "https://img.icons8.com/color/96/plumber.png",
//     },
//     {
//       name: "Electrician",
//       image: "https://img.icons8.com/color/96/electrical.png",
//     },
//     {
//       name: "Cleaning",
//       image: "https://img.icons8.com/color/96/broom.png",
//     },
//     {
//       name: "Carpentry",
//       image: "https://img.icons8.com/color/96/hammer.png",
//     },
//     {
//       name: "Painting",
//       image: "https://img.icons8.com/color/96/paint-palette.png",
//     },
//     {
//       name: "Appliance Repair",
//       image: "https://img.icons8.com/color/96/appliances.png",
//     },
//     {
//       name: "Beauty & Salon",
//       image: "https://img.icons8.com/color/96/barbershop.png",
//     },
//     {
//       name: "AC Services",
//       image: "https://img.icons8.com/color/96/air-conditioner.png",
//     },
//   ];

//   const scrollRef = useRef(null);
//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
//     }
//   };
//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="min-h-screen px-4 md:px-8 lg:px-10">
//       {/* Search Box - Top on mobile, side on desktop */}
//       <div className="w-full md:hidden mb-4">
//         <div className="flex items-center justify-between gap-2 bg-[#2f3640] rounded-full relative">
//           <input
//             type="text"
//             placeholder="Search Service Here...."
//             className="border-none bg-transparent outline-none text-white text-sm px-6 py-3 pr-12 placeholder-white w-full"
//           />
//           <button className="absolute right-2 w-10 h-10 rounded-full border-0 bg-gradient-to-r from-[#2AF598] to-[#009EFD] flex items-center justify-center text-white hover:shadow-lg transition-all duration-300">
//             <Search size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Top Part */}
//       <div className="flex flex-col md:flex-row justify-between w-full items-start md:items-center gap-4 py-4">
//         <h1 className="text-xl md:text-2xl lg:text-3xl font-serif">
//           Hello, {name} 👋
//         </h1>

//         {/* Search box for desktop */}
//         <div className="hidden md:block w-full md:w-auto max-w-md">
//           <div className="flex items-center justify-between gap-2 bg-[#2f3640] rounded-full relative">
//             <input
//               type="text"
//               placeholder="Search Service Here...."
//               className="border-none bg-transparent outline-none text-white text-sm px-6 py-3 pr-12 placeholder-white w-full"
//             />
//             <button className="absolute right-2 w-10 h-10 rounded-full border-0 bg-gradient-to-r from-[#2AF598] to-[#009EFD] flex items-center justify-center text-white hover:shadow-lg transition-all duration-300">
//               <Search size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Category Grid Section */}
//       <div className="mt-6 font-semibold">
//         <h1 className="text-xl md:text-2xl mb-4">Categories</h1>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4 lg:gap-6">
//           {categories.map((cat, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center p-3 md:p-4
//                  bg-white text-black
//                  dark:bg-gray-800 dark:text-white
//                  shadow-md dark:shadow-[0_4px_10px_rgba(255,255,255,0.2)]
//                  rounded-xl hover:shadow-2xl cursor-pointer transition-all duration-200
//                  hover:scale-105 active:scale-95"
//             >
//               <img
//                 src={cat.image}
//                 alt={cat.name}
//                 className="w-12 h-12 md:w-16 md:h-16 mb-2"
//               />
//               <span className="text-xs md:text-sm font-medium text-center leading-tight">
//                 {cat.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Popular Services */}
//       <div className="text-xl md:text-2xl font-semibold mt-8 relative">
//         <h1 className="mb-4">Popular Services</h1>

//         {/* Left scroll button */}
//         <button
//           onClick={scrollLeft}
//           className="hidden md:block absolute top-1/2 left-2 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-600 dark:text-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//         >
//           <ChevronLeft size={20} />
//         </button>

//         <div
//           ref={scrollRef}
//           className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth pb-4"
//           style={{
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}
//         >
//           {popularServices.map((service) => (
//             <div
//               key={service._id}
//               className="min-w-[200px] sm:min-w-[220px] md:min-w-[250px] bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-md p-3 flex-shrink-0 hover:shadow-lg transition-shadow"
//               onClick={() => {
//                 console.log(
//                   "clicked service is ",
//                   service,
//                   "id is ",
//                   service._id
//                 );
//                 Router.push(`/customer/services/${service._id}`);
//               }}
//             >
//               <img
//                 src="https://static.vecteezy.com/system/resources/thumbnails/054/039/938/small_2x/two-workers-in-blue-uniforms-converse-in-front-of-a-house-surrounded-by-containers-emphasizing-home-service-and-maintenance-png.png"
//                 alt={service.name}
//                 className="w-full h-32 md:h-40 object-cover rounded-lg"
//               />
//               <h3 className="mt-2 font-semibold text-sm md:text-base overflow-hidden text-ellipsis whitespace-nowrap">
//                 {service.title}
//               </h3>
//               <p className="font-bold text-sm md:text-base text-green-600 dark:text-green-400">
//                 {service.price}
//               </p>
//               <button
//                 className="w-full bg-gray-200 dark:bg-gray-700 text-red-400 border border-gray-400 border-b-4 mt-2 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group text-sm md:text-base"
//                 onClick={() => Router.push(`/customer/services/${service._id}`)}
//               >
//                 <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
//                 Book Now
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Right scroll button */}
//         <button
//           onClick={scrollRight}
//           className="hidden md:block absolute top-1/2 right-2 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-600 dark:text-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//         >
//           <ChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        // console.log(error.message);
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
          // console.error("Error fetching name:", data.message);
        }
      } catch (err) {
        // console.error("Request failed:", err);
      }
    }
    if (name === "") {
      fetchName();
    }
  }, [name, setName]);

  // console.log("popular service : ", popularServices);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-900 px-4 md:px-8 lg:px-12 py-6 transition-colors duration-500">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob-delay-2"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob-delay-4"></div>
      </div>

      <div className="relative z-10">
        {/* Search Box - Top on mobile */}
        <div className="w-full md:hidden mb-6 animate-fade-in-down">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative flex items-center justify-between gap-2 bg-white dark:bg-gray-800 rounded-full shadow-xl">
              <input
                type="text"
                placeholder="Search Service Here...."
                className="border-none bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm px-6 py-4 pr-14 placeholder-gray-400 dark:placeholder-gray-500 w-full"
              />
              <button className="absolute right-2 w-11 h-11 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-gradient-x">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Top Part */}
        <div className="flex flex-col md:flex-row justify-between w-full items-start md:items-center gap-4 mb-8 animate-fade-in-down">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
            Hello, {name} 👋
          </h1>

          {/* Search box for desktop */}
          <div className="hidden md:block w-full md:w-auto max-w-md animate-fade-in-down-delay">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
              <div className="relative flex items-center justify-between gap-2 bg-white dark:bg-gray-800 rounded-full shadow-xl">
                <input
                  type="text"
                  placeholder="Search Service Here...."
                  className="border-none bg-transparent outline-none text-gray-700 dark:text-gray-200 text-sm px-6 py-4 pr-14 placeholder-gray-400 dark:placeholder-gray-500 w-full"
                />
                <button className="absolute right-2 w-11 h-11 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-gradient-x">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Grid Section */}
        <div className="mt-8 mb-12 animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-5 lg:gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center p-4 md:p-5 
                   bg-white dark:bg-gray-800
                   shadow-lg dark:shadow-purple-900/20
                   rounded-2xl cursor-pointer transition-all duration-300
                   hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30
                   active:scale-95 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-14 h-14 md:w-16 md:h-16 mb-3 filter drop-shadow-lg"
                  />
                </div>
                <span className="relative text-xs md:text-sm font-semibold text-center leading-tight text-gray-700 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        <div className="text-xl md:text-2xl font-semibold mt-12 relative animate-fade-in-up-delay">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Popular Services
          </h2>

          {/* Left scroll button */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-xl rounded-full p-3 z-10 hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 items-center justify-center"
          >
            <ChevronLeft size={24} className="md:w-6 md:h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-6 px-1 scrollbar-hide"
          >
            {popularServices.map((service, index) => (
              <div
                key={service._id}
                className="group min-w-[220px] sm:min-w-[240px] md:min-w-[280px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 p-4 flex-shrink-0 transition-all duration-300 hover:scale-105 cursor-pointer animate-slide-in-right"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  // console.log(
                  //   "clicked service is ",
                  //   service,
                  //   "id is ",
                  //   service._id
                  // );
                  Router.push(`/customer/services/${service._id}`);
                }}
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  {/* Painter Image */}
                  {service.category == "Painter" && (
                    <img
                      src="https://png.pngtree.com/png-clipart/20230806/original/pngtree-painter-holds-roller-and-bucket-person-roll-paint-vector-picture-image_9952192.png"
                      alt={service.name}
                      className="w-full h-36 md:h-44 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  {/* Cleaner Image */}
                  {service.category == "Cleaner" && (
                    <img
                      src="https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-carpet-cleaning-service-png-illustration-png-image_11586121.png"
                      alt={service.name}
                      className="w-full h-36 md:h-44 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  )}

                  {/* Electrician Image */}
                  {service.category == "Electrician" && (
                    <img
                      src="https://png.pngtree.com/png-vector/20250103/ourmid/pngtree-a-cute-electrician-boy-clipart-illustration-with-transparent-background-png-image_15026633.png"
                      alt={service.name}
                      className="w-full h-36 md:h-44 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  )}

                  {/* Plumber Image */}
                  {service.category == "Plumber" && (
                    <img
                      src="https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-plumber-holding-plunger-cartoon-character-working-png-image_11586480.png"
                      alt={service.name}
                      className="w-full h-36 md:h-44 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                <h3 className="font-bold text-base md:text-lg text-gray-800 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap mb-2">
                  {service.title}
                </h3>
                <p className="font-bold text-lg md:text-xl bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-3">
                  {service.price}
                </p>
                <button
                  className="relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold px-4 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95 group/btn"
                  onClick={() =>
                    Router.push(`/customer/services/${service._id}`)
                  }
                >
                  <span className="relative z-10">Book Now</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            ))}
          </div>

          {/* Right scroll button */}
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-xl rounded-full p-3 z-10 hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 items-center justify-center"
          >
            <ChevronRight size={24} className="md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
