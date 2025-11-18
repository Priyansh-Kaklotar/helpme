"use client";
import React from "react";
import OTPInput from "@/src/components/OTPInput/page";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { Bounce } from "react-toastify";
import Loader from "@/src/components/Loader/page";

const Page = () => {
  const [Email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function GetEmail() {
      try {
        const res = await axios.get("/api/get-email");
        const data = await res.data;
        setEmail(data.email);
        console.log("Email fetched:", data.email);
      } catch (error) {
        console.log(error.message);
      }
    }
    GetEmail();
  }, []);
  const navigate = useRouter();

  const handleOtpComplete = async (otp) => {
    setLoading(true);
    console.log("OTP entered:", otp);
    try {
      const response = await axios.post("/auth/verifyotp", {
        email: Email,
        otp: otp,
      });
      const data = await response.data;
      console.log("OTP verification response:", data);
      toast.success(data.message);
      if (data.success == true) {
        toast.success("✅ Signin Successful");
        navigate.push("/");
      }
    } catch (error) {
      const errormessage = await error.response.data;
      toast.error(errormessage.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      <div className="w-full h-dvh min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 px-4 py-16">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl z-10 w-full max-w-md mx-auto flex flex-col items-center justify-center h-full">
          <div className="flex justify-center items-center mb-8">
            <img src="/favicon.ico" alt="Logo" className="w-24 h-24" />
          </div>
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Verify Your OTP
            </h1>
          </div>
          <div className="flex justify-center items-center mb-8">
            <p className="text-gray-700 dark:text-gray-300">
              Please enter the OTP sent to your registered email or phone
              number.
            </p>
          </div>
          {/* OTP Input Component */}
          <div className="flex justify-center items-center mb-8 flex-col gap-4">
            <h1 className="font-bold text-2xl text-purple-500">Enter OTP</h1>
            <OTPInput onComplete={handleOtpComplete} />
          </div>
        </div>
      </div>

      {loading && <Loader />}
    </>
  );
};

export default Page;
