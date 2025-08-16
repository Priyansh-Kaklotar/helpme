// "use client";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
// import React from "react";
// import ThemeToggleButton from "@/src/components/ui/theme-toggle-button";
// import Image from "next/image";

// function Page() {
//   const topWave = "/svg (1).png";
//   const bottomWave = "/svg (2).png";

//   let [eyeOn, setEyeOn] = useState(true);
//   function reverseEye() {
//     setEyeOn((prev) => !prev);
//   }

//   return (
//     <>
//       <div className="absolute top-4 left-4 ">
//         <ThemeToggleButton />
//       </div>
//       <div className="w-screen h-screen flex dark:text-white text-black items-center justify-around">
//         <div className="w-[70%] h-7/10 dark:bg-white border-1 bg-black rounded-lg overflow-hidden">
//           <Image
//             src={topWave}
//             alt="alternate"
//             width={1000}
//             height={70}
//             className="ml-18.5 -mt-5 overflow-hidden rounded-lg"
//           />

//           {/* Left Form Section */}
//           <div className="w-full flex justify-center items-center">
//             <div className="w-full mr-96 -mt-55 md:w-1/2 p-10 flex flex-col justify-center">
//               <h2 className="text-3xl font-bold text-gray-300 dark:text-black">
//                 Hello!
//               </h2>
//               <p className="text-gray-700 dark:text-gray-300 mb-6">
//                 Sign in to your account
//               </p>

//               {/* Email */}
//               <div className="flex items-center bg-white dark:bg-gray-700 shadow-lg rounded-full px-4 py-3 mb-4">
//                 <span className="text-purple-500 mr-3">📧</span>
//                 <input
//                   type="email"
//                   placeholder="E-mail"
//                   className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-200"
//                 />
//               </div>

//               {/* Password */}
//               <div className="flex items-center bg-white dark:bg-gray-700 shadow-lg rounded-full px-4 py-3 mb-2">
//                 <span className="text-purple-500 mr-3">🔒</span>
//                 <input
//                   type={eyeOn ? "text" : "password"}
//                   placeholder="Password"
//                   className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-200"
//                 />
//                 {eyeOn == true ? (
//                   <span
//                     className="text-purple-400 cursor-pointer"
//                     onClick={reverseEye}
//                   >
//                     👁
//                   </span>
//                 ) : (
//                   <span
//                     className="text-purple-400 align-center text-md cursor-pointer"
//                     onClick={reverseEye}
//                   >
//                     ◡
//                   </span>
//                 )}
//               </div>

//               {/* Remember + Forgot */}
//               <div className="flex justify-between items-center mb-6 text-sm">
//                 <label className="flex items-center text-gray-500 dark:text-gray-400">
//                   <input type="checkbox" className="mr-2 accent-purple-500" />{" "}
//                   Remember me
//                 </label>
//                 <a href="#" className="text-purple-500 hover:underline">
//                   Forgot password?
//                 </a>
//               </div>

//               {/* Sign in Button */}
//               <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:scale-105 transition-transform">
//                 SIGN IN
//               </button>

//               {/* Create account */}
//               <p className="text-center mt-4 text-gray-500 dark:text-gray-500">
//                 Don’t have an account?{" "}
//                 <a href="#" className="text-purple-500 hover:underline">
//                   Create Account
//                 </a>
//               </p>
//             </div>
//             <div className="-mt-56 -ml-24">
//               <h1 className="text-red-600 text-4xl -ml-40">Welcome Back,</h1>
//               <p className="mt-4 -ml-40 dark:text-gray-500 text-white">
//                 Welcome to our Website, let's Help Others
//               </p>
//             </div>
//           </div>

//           <Image
//             src={bottomWave}
//             alt="alternate"
//             width={1000}
//             height={60}
//             className="ml-18.5 -mt-44 overflow-hidden rounded-lg"
//           />
//         </div>
//       </div>
//     </>
//   );
// }
// export default Page;

"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";
import ThemeToggleButton from "@/src/components/ui/theme-toggle-button";
import Image from "next/image";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from "next/navigation";
import { Bounce } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "PASSWORD is not STRONG!!"
    )
})


function Page() {
  const topWave = "/svg_(1).png";
  const bottomWave = "/svg_(2).png";

  let [eyeOn, setEyeOn] = useState(false);
  function reverseEye() {
    setEyeOn((prev) => !prev);
  }

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (d) => {
    console.log(d);
    try {
      const res = await axios.post("/auth/login", {
        name: d.name,
        password: d.password,
        usertype: "Customer",
      });
      const data = await res.data;
      console.log(data.success);
      if (data.success) {
        toast.success('✅ Signin Successful', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          onClose: () => router.push("/"),
        });
        reset();
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <>
      <div className="absolute top-4 left-4 z-10">
        <ThemeToggleButton />
      </div>
      <div className="w-screen h-screen flex flex-col lg:flex-row dark:text-white text-black items-center justify-center lg:justify-around p-4">
        <div className="w-full lg:w-[70%] h-auto lg:h-7/10 dark:bg-white border-1 bg-black rounded-3xl overflow-hidden">
          {/* Top Wave */}
          <Image
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            src={topWave}
            alt="alternate"
            width={1000}
            height={70}
            className="ml-0 lg:ml-18.5 -mt-5 overflow-hidden rounded-lg"
          />

          {/* Form + Welcome Section */}
          <div className="w-full flex flex-col lg:flex-row justify-center items-center px-4">
            <div className="w-full lg:mr-96 lg:-mt-55 md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 dark:text-black">
                Hello!
              </h2>
              <p className="text-gray-700 dark:text-gray-500 mb-6 text-sm sm:text-base">
                Sign in to your account
              </p>

              {/* form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
              >

                <div className="flex items-center bg-white dark:bg-gray-700 shadow-lg rounded-full px-4 py-3 mb-4">
                  <span className="text-purple-500 mr-3">📧</span>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Name"
                    className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-200 text-sm sm:text-base"
                  />
                </div>

                {/* Password */}
                <div className="flex items-center bg-white dark:bg-gray-700 shadow-lg rounded-full px-4 py-3 mb-2">
                  <span className="text-purple-500 mr-3">🔒</span>
                  <input
                    {...register("password")}
                    type={eyeOn ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="off"
                    className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-200 text-sm sm:text-base"
                  />
                  {eyeOn ? (
                    <span
                      className="text-purple-400 cursor-pointer"
                      onClick={reverseEye}
                    >
                      👁
                    </span>
                  ) : (
                    <span
                      className="text-purple-400 align-center text-md cursor-pointer"
                      onClick={reverseEye}
                    >
                      ◡
                    </span>
                  )}
                </div>

                {/* Remember + Forgot */}
                <div className="flex flex-row justify-between items-center mb-6 text-xs sm:text-sm gap-2  relative z-10">
                  <label className="flex items-center text-gray-500 dark:text-gray-400">
                    <input type="checkbox" className="mr-2 accent-purple-500" />{" "}
                    Remember me
                  </label>
                  <Link href="#" className="text-purple-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {/* Sign in Button */}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:scale-105 transition-transform text-sm sm:text-base relative z-10">
                  SIGN IN
                </button>
              </form>

              {/* Create account */}
              <p className="text-center mt-4 text-gray-500 dark:text-gray-500 text-sm sm:text-base">
                Don’t have an account?{" "}
                <Link
                  href="/signin/customer"
                  className="text-purple-500 hover:underline cursor-pointer z-20"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Right Welcome Text */}
            <div className="hidden lg:block md-block xl-block mt-10 lg:-mt-56 lg:-ml-24 text-center lg:text-left">
              <h1 className="text-red-600 text-2xl sm:text-3xl lg:text-4xl lg:-ml-48">
                Welcome Back,
              </h1>
              <p className="mt-2 lg:-ml-48 dark:text-gray-500 text-white text-sm sm:text-base">
                Welcome to our Website, let's Help Others
              </p>
            </div>
          </div>

          {/* Bottom Wave */}
          <Image
            src={bottomWave}
            alt="alternate"
            width={1000}
            height={60}
            className="ml-0 lg:ml-18.5 -mt-7 lg:-mt-44 overflow-hidden rounded-lg pointer-events-none"
          />
        </div>
      </div>
    </>
  );
}

export default Page;

// function page() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 relative">
//       <div className="absolute top-4 left-4">
//         <ThemeToggleButton />
//       </div>

//       {/* Background Gradient */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden max-w-7xl w-full"
//       >
//         {/* Left Form Section */}
//         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
//           <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
//             Hello!
//           </h2>
//           <p className="text-gray-500 dark:text-gray-300 mb-6">
//             Sign in to your account
//           </p>

//           {/* Email */}
//           <div className="flex items-center bg-white dark:bg-gray-700 shadow-lg rounded-full px-4 py-3 mb-4">
//             <span className="text-purple-500 mr-3">📧</span>
//             <input
//               type="email"
//               placeholder="E-mail"
//               className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-200"
//             />
//           </div>

//           {/* Password */}
//           <div className="flex items-center bg-white dark:bg-gray-700 shadow-lg rounded-full px-4 py-3 mb-2">
//             <span className="text-purple-500 mr-3">🔒</span>
//             <input
//               type="password"
//               placeholder="Password"
//               className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-200"
//             />
//             <span className="text-purple-400 cursor-pointer">👁</span>
//           </div>

//           {/* Remember + Forgot */}
//           <div className="flex justify-between items-center mb-6 text-sm">
//             <label className="flex items-center text-gray-500 dark:text-gray-300">
//               <input type="checkbox" className="mr-2 accent-purple-500" />{" "}
//               Remember me
//             </label>
//             <a href="#" className="text-purple-500 hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           {/* Sign in Button */}
//           <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:scale-105 transition-transform">
//             SIGN IN
//           </button>

//           {/* Create account */}
//           <p className="text-center mt-4 text-gray-500 dark:text-gray-300">
//             Don’t have an account?{" "}
//             <a href="#" className="text-purple-500 hover:underline">
//               Create
//             </a>
//           </p>
//         </div>

//         <linearGradient id="gradient" x1=""></linearGradient>
//         {/* bg-gradient-to-tr from-purple-500 to-blue-500 */}
//         {/* Right Gradient Section */}
//         <div className="w-full md:w-1/2 relative bg-white flex flex-col items-center justify-center">
//           {/* Top Wave */}
//           <div className="absolute top-0 left-0 w-full">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
//               <path
//                 fill="black"
//                 // fill="gradient-to-tr from-purple-500 to-blue-500"
//                 fillOpacity="1"
//                 d="M0,64L48,90.7C96,117,192,171,288,165.3C384,160,480,96,576,101.3C672,107,768,181,864,181.3C960,181,1056,107,1152,101.3C1248,96,1344,160,1392,192L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
//               ></path>
//             </svg>
//           </div>

//           <h2 className="text-3xl font-bold text-black bg-white mt-24">
//             Welcome Back!
//           </h2>
//           <p className="text-black bg-white text-center max-w-xs mt-4">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
//             pharetra magna nisl, at posuere sem dapibus sed.
//           </p>

//           {/* Bottom Wave */}
//           <div className="absolute bottom-0 left-0 w-full rotate-180">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
//               <path
//                 fill="#fff"
//                 fillOpacity="1"
//                 d="M0,64L48,90.7C96,117,192,171,288,165.3C384,160,480,96,576,101.3C672,107,768,181,864,181.3C960,181,1056,107,1152,101.3C1248,96,1344,160,1392,192L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
//               ></path>
//             </svg>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
// export default page;
