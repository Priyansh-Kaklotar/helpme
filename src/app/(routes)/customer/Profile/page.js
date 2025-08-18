"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/src/components/Loader/page";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await axios.get("/api/customer-details");

        // aa nichena route thi pan user no data fetch kari sakay pan have chalse
        // const res = await axios.get("/api/customer/profile");
        const data = res.data;
        if (data.success) {
          setName(data.name);
          setEmail(data.email);
          setPincode(data.pincode);
          setAddress(data.address);
        } else {
          console.log("error in the get data useEffect");
        }
      } catch (error) {
        console.log("Request Failed : ", error.message);
      }
    }

    getUserData();
  }, []);

  // useEffect(() => {
  //   async function fetchName() {
  //     try {
  //       const res = await axios.get("/api/get-name");
  //       const data = res.data;
  //       if (data.success) {
  //         setName(data.name);
  //       } else {
  //         console.error("Error fetching name:", data.message);
  //       }
  //     } catch (err) {
  //       console.error("Request failed:", err);
  //     }
  //   }

  //   if (name === "") {
  //     // Fetch name only if not already set
  //     fetchName();
  //   }
  // }, [name, setName]);

  // useEffect(() => {
  //   async function fetchEmail() {
  //     try {
  //       const res2 = await axios.get("/api/get-email");
  //       const data2 = res2.data;
  //       if (data2.success) {
  //         setEmail(data2.email);
  //       } else {
  //         console.error("Error fetching name:", data.message);
  //       }
  //     } catch (error) {
  //       console.log("Error Fetching email : ", error.message);
  //     }
  //   }

  //   if (email == "") {
  //     fetchEmail();
  //   }
  // }, [email, setEmail]);

  const profileImage = name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const updateProfile = async (field) => {
    if (pincode.length !== 6) {
      alert("Pincode Must be Exactly 6 Digits");
      return;
    }
    setLoading(true);
    try {
      const payload = field === "address" ? { address } : { pincode };
      const res = await axios.patch("/api/customer/profile", payload);

      if (res.data.success) {
        alert(res.data.message);
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("Update error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {/* Profile Image section  */}
        <div className="flex justify-between items-center">
          <div className="flex justify-between gap-2 items-center mt-2 ml-4">
            <div
              id="profileImage"
              className="w-30 h-30 rounded-full bg-[#004D3C] text-white text-[3.5rem] font-sans text-center flex justify-center items-center"
            >
              {profileImage}
            </div>
            <div>
              <h2>{name}</h2>
              <h3>{email}</h3>
            </div>
          </div>

          <div className="mr-10">
            <button className="px-5 py-3 rounded-xl bg-blue-400 hover:bg-blue-500">
              {" "}
              Edit{" "}
            </button>
          </div>
        </div>

        {/* Profile Related Details Section */}
        <div className="flex flex-col justify-center items-center gap-5">
          {/* User name */}
          <div className="w-3/10">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username :
            </label>
            <div className="mt-1 flex rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden">
              <p className="w-full bg-white dark:bg-gray-950 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none">
                {name}
              </p>
            </div>
          </div>
          {/* Email */}
          <div className="w-3/10">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email :
            </label>
            <div className="mt-1 flex rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden">
              <p className="w-full bg-white dark:bg-gray-950 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none">
                {email}
              </p>
            </div>
          </div>
          {/* Address */}
          <div className="w-3/10">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Address :
            </label>
            <div className="mt-1 flex rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden">
              <textarea
                rows={4}
                placeholder="Update Your Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="w-full bg-white dark:bg-gray-950 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none"
              >
                {address}
              </textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={() => updateProfile("address")}
                className="bg-blue-400 p-3 rounded-xl mt-1 hover:bg-blue-500 active:scale-85"
              >
                {" "}
                Update{" "}
              </button>
            </div>
          </div>
          {/* Pincode */}
          <div className="w-3/10">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Pincode :
            </label>
            <div className="mt-1 flex rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden">
              <input
                type="number"
                placeholder="Update your Pincode"
                min={0}
                maxLength={6}
                onChange={(e) => {
                  // allow only digits and max 6
                  if (/^\d{0,6}$/.test(e.target.value)) {
                    setPincode(e.target.value);
                  }
                }}
                value={pincode}
                className="w-full bg-white dark:bg-gray-950 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={() => updateProfile("pincode")}
                className="bg-blue-400 p-3 rounded-xl mt-1 hover:bg-blue-500 active:scale-85"
              >
                {" "}
                Update{" "}
              </button>
            </div>
          </div>
        </div>
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Page;
