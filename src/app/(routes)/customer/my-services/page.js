"use client";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

function Page() {
  const [Bookings, setBookings] = useState([]);

  useEffect(() => {
    async function Get_service() {
      try {
        const res = await axios.get("/api/customer/bookings");
        const data = await res.data;
        // console.log(data);
        setBookings(data);
      } catch (error) {
        // console.log(error.message);
      }
    }
    Get_service();
  }, []);

  return (
    <>
      {Bookings.length === 0 ? (
        <h1 className="text-3xl font-bold text-center mt-10">
          No Bookings Yet
        </h1>
      ) : (
        <div className="container mx-auto p-4">
          {Bookings.map((booking) => {
            return (
              <div
                key={booking._id}
                className="border p-4 mb-4 rounded shadow w-100"
              >
                status : {booking.bookingStatus} <br />
                Service name :{booking.service.title} <br />
                service price : {booking.service.price} <br />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Page;
