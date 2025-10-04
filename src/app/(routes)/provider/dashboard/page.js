"use client";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Bounce, toast } from "react-toastify";

function page() {
  const [allBooking, setAllBooking] = useState([]);
  const [confirmBooking, setConfirmBooking] = useState([]);
  const [rejectedBooking, setRejectedBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // first time all booking fetch
  useEffect(() => {
    async function fetchBooking() {
      try {
        setLoading(true);
        const res = await axios.get("/api/provider/bookings");
        const data = res.data;
        console.log(data.services);
        setAllBooking(data.services || []);
        setError(null);
      } catch (error) {
        console.log("error in the provider/dashboard ", error.message);
        setError("Failed to fetch bookings");
        setAllBooking([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, []);

  useEffect(() => {
    console.log("All Booking = ", allBooking);
    console.log("Confirm Booking = ", confirmBooking);
    console.log("Rejected Booking = ", rejectedBooking);
  }, [allBooking, confirmBooking, rejectedBooking]);

  //booking Card component
  const BookingCard = ({ booking, onConfirm, onReject }) => {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case "pending":
          return "from-orange-400 to-red-400";
        case "confirmed":
          return "from-green-400 to-emerald-400";
        case "rejected":
          return "from-red-400 to-pink-400";
        default:
          return "from-orange-400 to-red-400";
      }
    };

    return (
      <div className="group relative backdrop-blur-lg bg-white/15 border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out">
        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>

        {/* Header with status */}
        <div className="flex justify-between items-start mb-5">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${getStatusColor(
              booking.bookingStatus
            )} text-white text-xs font-semibold uppercase tracking-wide animate-pulse`}
          >
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
            {booking.bookingStatus || "pending"}
          </div>
          <div className="text-white/60 text-sm font-medium">
            #{booking._id?.slice(-6) || "N/A"}
          </div>
        </div>

        {/* Service Details */}
        <div className="mb-6">
          <h3 className="text-white text-2xl font-bold mb-2 capitalize">
            {booking.service?.title || booking.title || "Service"}
          </h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-3">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {booking.service?.category || booking.category || "Service"}
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            {booking.service?.description ||
              booking.description ||
              "No description available"}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-l-4 border-blue-400">
            <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
              Customer
            </div>
            <div className="text-white font-semibold truncate">
              {booking.user?.name || "N/A"}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-l-4 border-purple-400">
            <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
              Pincode
            </div>
            <div className="text-white font-semibold">
              {booking.user?.pincode || "N/A"}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-l-4 border-pink-400">
            <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
              Booked On
            </div>
            <div className="text-white font-semibold">
              {booking.createdAt ? formatDate(booking.createdAt) : "N/A"}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-l-4 border-indigo-400">
            <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
              Address
            </div>
            <div className="text-white font-semibold text-xs truncate">
              {booking.user?.address || "N/A"}
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl p-4 text-center mb-6">
          <div className="text-white/80 text-sm font-medium mb-1">
            Total Amount
          </div>
          <div className="text-white text-2xl font-bold">
            ₹{booking.service?.price || booking.price || 0}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            // onClick={() => handleConfirm(booking._id)}
            onClick={() => onConfirm(booking._id)}
            disabled={booking.bookingStatus === "confirmed"}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl z-10"
            // className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700  text-white font-semibold py-3 px-6 z-10 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {booking.bookingStatus === "confirmed" ? "Confirmed" : "Confirm"}
            </div>
          </button>

          <button
            onClick={() => onReject(booking._id)}
            // onClick={() => handleReject(booking._id)}
            disabled={
              booking.bookingStatus === "rejected" ||
              booking.bookingStatus === "confirmed"
            }
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 z-10 shadow-lg hover:shadow-xl"
            // className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all z-10 duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              {booking.bookingStatus === "rejected" ? "Rejected" : "Reject"}
            </div>
          </button>
        </div>
      </div>
    );
  };

  //handle confirm Booking
  const handleConfirm = async (bookingId) => {
    try {
      setLoading(true);
      console.log("Confirming booking:", bookingId);

      // Update the booking status in the API
      const response = await axios.patch(
        `/api/provider/bookings/${bookingId}/status`,
        {
          status: "confirmed",
        }
      );

      // Update the local state
      setAllBooking((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, bookingStatus: "confirmed" }
            : booking
        )
      );

      console.log("Booking confirmed successfully");
      setLoading(false);
      toast.success("✅ Booking Confirm Successful", {
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
    } catch (error) {
      console.error("Error confirming booking:", error.message);
      // we can add a toast notification here
    }
  };

  //handle rejected Booking
  const handleReject = async (bookingId) => {
    try {
      setLoading(true);
      console.log("Rejecting booking:", bookingId);

      // Update the booking status in the API
      const response = await axios.patch(
        `/api/provider/bookings/${bookingId}/status`,
        {
          status: "rejected",
        }
      );

      // Update the local state
      // setAllBooking((prevBookings) =>
      //   prevBookings.map((booking) =>
      //     booking._id === bookingId
      //       ? { ...booking, bookingStatus: "rejected" }
      //       : booking
      //   )
      // );

      setAllBooking((prev) =>
        prev.filter((booking) => booking._id !== bookingId)
      );
      console.log("Booking rejected successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error rejecting booking:", error.message);
      // You can add a toast notification here
    }
  };

  // function showConfirmeBooking() {
  //   return allBooking
  //     .filter((booking) => booking.bookingStatus === "confirmed")
  //     .map((booking) => (
  //       <BookingCard
  //         key={booking._id}
  //         booking={booking}
  //         onConfirm={handleConfirm}
  //         onReject={handleReject}
  //       />
  //     ));
  // }

  const [selectedStatus, setSelectedStatus] = useState("pending");
  const showBookings = (status) => {
    return allBooking
      .filter((b) => b.bookingStatus === status)
      .map((b) => (
        <BookingCard
          key={b._id}
          booking={b}
          onConfirm={handleConfirm}
          onReject={handleReject}
        />
      ));
  };
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <span className="ml-4 text-white text-lg font-semibold">
              Loading bookings...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 text-center">
          <svg
            className="w-16 h-16 text-red-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-white mb-2">
            Error Loading Bookings
          </h3>
          <p className="text-white/70 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            Provider Dashboard
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Manage your service bookings with ease
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            onClick={() => setSelectedStatus("pending")}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20"
          >
            <div className="text-3xl font-bold text-white mb-2">
              {allBooking.filter((b) => b.bookingStatus === "pending").length}
            </div>
            <div className="text-white/70 font-medium">Pending</div>
          </div>
          <div
            onClick={() => setSelectedStatus("confirmed")}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20"
          >
            <div className="text-3xl font-bold text-white mb-2">
              {allBooking.filter((b) => b.bookingStatus === "confirmed").length}
            </div>
            <div className="text-white/70 font-medium">Confirmed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">
              ₹
              {allBooking.reduce(
                (sum, b) => sum + (b.service?.price || b.price || 0),
                0
              )}
            </div>
            <div className="text-white/70 font-medium">Total Revenue</div>
          </div>
          <div
            onClick={() => setSelectedStatus("pending")}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20"
          >
            <div className="text-3xl font-bold text-white mb-2">
              {allBooking.length}
            </div>
            <div className="text-white/70 font-medium">Total Bookings</div>
          </div>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="max-w-7xl mx-auto">
        {allBooking && allBooking.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* {allBooking.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onConfirm={handleConfirm}
                onReject={handleReject}
              />
            ))} */}

            {/* {allBooking
              .filter((booking) => booking.bookingStatus === "pending")
              .map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onConfirm={handleConfirm}
                  onReject={handleReject}
                />
              ))} */}

            {showBookings(selectedStatus)}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-white/50 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Bookings Yet
              </h3>
              <p className="text-white/70">
                New service requests will appear here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
