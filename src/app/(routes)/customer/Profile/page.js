"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/src/components/Loader/page";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await axios.get("/api/customer-details");
        const data = res.data;
        if (data.success) {
          setName(data.name || "");
          setEmail(data.email || "");
          setPincode(data.pincode || "");
          setAddress(data.address || "");
        }
      } catch (error) {
        // console.error("Request Failed:", error?.message || error);
      }
    }
    getUserData();
  }, []);

  const initials = (name || "U")
    .split(" ")
    .map((n) => n?.[0] ?? "")
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const updateProfile = async (field) => {
    setLoading(true);
    try {
      const payload = field === "address" ? { address } : { pincode };
      if (field === "pincode") {
        if (pincode.toString().length !== 6) {
          toast.error("Pincode must be exactly 6 digits", {
            position: "top-right",
            autoClose: 4000,
            transition: Bounce,
            theme: "colored",
          });
          setLoading(false);
          return;
        }
      }
      const res = await axios.patch("/api/customer/profile", payload);
      if (res.data?.success) {
        toast.success(res.data.message || "Updated successfully", {
          position: "top-right",
          autoClose: 3500,
          transition: Bounce,
          theme: "colored",
        });
      } else {
        toast.error(res.data?.message || "Update failed", {
          position: "top-right",
          autoClose: 3500,
          transition: Bounce,
          theme: "colored",
        });
      }
    } catch (err) {
      // console.error("Update error:", err?.message || err);
      toast.error("Network error. Try again.", {
        position: "top-right",
        autoClose: 3500,
        transition: Bounce,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-purple-900 via-purple-700 to-indigo-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/6 backdrop-blur-md dark:bg-black/20 rounded-2xl border border-white/10 dark:border-white/6 shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl md:text-4xl font-bold shadow-md">
                    {initials}
                  </div>
                  <div>
                    <h1 className="text-white text-lg md:text-2xl font-semibold">
                      {name || "Unnamed User"}
                    </h1>
                    <p className="text-purple-200 text-sm md:text-base">
                      {email || "No email set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-[0.99] transition"
                  >
                    Contact Support
                  </a>
                  <button
                    onClick={() => {
                      setAddress("");
                      setPincode("");
                      toast.info("Fields cleared", {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "colored",
                      });
                    }}
                    className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/10 hover:bg-white/20 transition"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1">
                      Username
                    </label>
                    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white">
                      {name || "—"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1">
                      Email
                    </label>
                    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white">
                      {email || "—"}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1">
                      Address
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Update your address"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => updateProfile("address")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-[0.99] transition"
                      >
                        Update Address
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="6-digit pincode"
                      value={pincode}
                      onChange={(e) => {
                        if (/^\d{0,6}$/.test(e.target.value))
                          setPincode(e.target.value);
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => updateProfile("pincode")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-[0.99] transition"
                      >
                        Update Pincode
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-white/6 pt-4 text-center md:text-left">
                <p className="text-sm text-purple-200">
                  Need help? Email{" "}
                  <a
                    className="underline text-white"
                    href="mailto:support@yourdomain.com"
                  >
                    support@yourdomain.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
