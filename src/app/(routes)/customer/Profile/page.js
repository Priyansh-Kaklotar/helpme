"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  useEffect(() => {
    async function fetchEmail() {
      try {
        const res2 = await axios.get("/api/get-email");
        const data2 = res2.data;
        if (data2.success) {
          setEmail(data2.email);
          console.log(email);
        } else {
          console.error("Error fetching name:", data.message);
        }
      } catch (error) {
        console.log("Error Fetching eail : ", error.message);
      }
    }

    if (email == "") {
      fetchEmail();
    }
  }, [email, setEmail]);

  const profileImage = name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
  console.log("profile image : ", profileImage);
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
      </div>
    </>
  );
};

export default page;
