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
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { Bounce } from "react-toastify";
import Loader from "@/src/components/Loader/page";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "PASSWORD is not STRONG!!"
    ),
});

function Page() {
  const topWave = "/svg_(1).png";
  const bottomWave = "/svg_(2).png";

  let [eyeOn, setEyeOn] = useState(false);
  function reverseEye() {
    setEyeOn((prev) => !prev);
  }

  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (d) => {
    console.log(d);
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", {
        name: d.name,
        password: d.password,
        usertype: "Customer",
      });
      const data = await res.data;
      console.log(data.success);
      console.log(data);
      if (data.success) {
        toast.success("✅ Signin Successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        reset();
        navigate.push("/customer");
      } else {
        toast.error(data.message || "Login failed!");
        console.log("error while login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:scale-105 transition-transform text-sm sm:text-base relative z-10"
                >
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
                {`Welcome to our Website, let's Help Others`}
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
      {loading && <Loader />}
    </>
  );
}

export default Page;
