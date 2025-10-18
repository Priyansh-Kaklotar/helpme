"use client";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  DollarSign,
  CheckCircle,
  FileText,
  MoveLeft,
  Check,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/src/components/Loader/page";
import OTPInput from "@/src/components/OTPInput/page";
import OTPVerificationModal from "../../verifyCompleteOTP/page";

export default function BookingDetails() {
  const params = useParams();
  const id = params.id;
  const [bookingId, setBookingId] = useState(id);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchBookingDetails();
    }
    console.log("booking id = ", bookingId);
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      console.log("id = ", id);

      const response = await axios.get(`/api/bookings/${id}`);

      const data = response.data;
      console.log("data = ", data.booking);

      if (data.success) {
        setBooking(data.booking);
        if (data.booking.bookingStatus == "completed") {
          console.log("booking Status : ", data.booking.bookingStatus);
          setIsCompleted(true);
        }
      }

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  async function handleCompleteButton() {
    try {
      // Send OTP to customer email
      const response = await axios.post("/api/otp/serviceComplete", {
        bookingId: booking._id,
        userId: booking.user._id,
        providerId: booking.serviceProvider._id,
        email: booking.user.email,
      });

      if (response.data.success) {
        // Show OTP modal
        setShowOTPModal(true);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    }
  }

  const handleOTPSuccess = async (data) => {
    // Close modal
    setShowOTPModal(false);

    // Update booking status
    setIsCompleted(true);

    // Booking model ma Staus chnage thay jse
    try {
      const response = await axios.patch(`/api/bookings/${id}/status`, {
        bookingStatus: "completed",
      });

      const data = response.data;

      console.log("after change the booking status : ", data);
    } catch (error) {
      console.log(
        "error in the upadet the booking status to completed : ",
        error.message
      );
    }

    // Refresh booking details
    await fetchBookingDetails();

    // Show success message or redirect
    alert("Service completed successfully!");
  };

  const handleCancelOTP = () => {
    setShowOTPModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Search Section */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Booking Details
          </h1>
          <p className="text-gray-600">Enter your booking ID to view details</p>
          {/* <button className="text-left text-black">Back to Home Page</button> */}
        </div>

        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-3 px-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </div>
            <span>Go Back</span>
          </button>
        </div>

        {/* Booking Details */}
        {booking && (
          <div className="space-y-6 animate-slideUp">
            {/* Status Banner */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Booking Confirmed</h2>
                    <p className="text-green-100">ID: {booking._id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">
                    ₹{booking.totalAmount}
                  </div>
                  <div className="text-green-100">Total Amount</div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-600" />
                Service Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4">
                  <div className="text-sm text-purple-700 font-semibold mb-1">
                    Service
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {booking.service.title}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4">
                  <div className="text-sm text-blue-700 font-semibold mb-1">
                    Category
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {booking.service.category}
                  </div>
                </div>
                <div className="md:col-span-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-4">
                  <div className="text-sm text-amber-700 font-semibold mb-1">
                    Description
                  </div>
                  <div className="text-gray-800">
                    {booking.service.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                Schedule
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                  <Calendar className="w-10 h-10 text-blue-600" />
                  <div>
                    <div className="text-sm text-blue-700 font-semibold">
                      Booking Date
                    </div>
                    <div className="text-gray-800 font-medium">
                      {formatDate(booking.bookingDate)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4">
                  <Clock className="w-10 h-10 text-purple-600" />
                  <div>
                    <div className="text-sm text-purple-700 font-semibold">
                      Time Slot
                    </div>
                    <div className="text-gray-800 font-medium">
                      {booking.timeSlot}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-pink-600" />
                Customer Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4">
                  <User className="w-8 h-8 text-pink-600" />
                  <div>
                    <div className="text-sm text-pink-700 font-semibold">
                      Name
                    </div>
                    <div className="text-gray-800 font-medium">
                      {booking.user.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                  <Phone className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-sm text-emerald-700 font-semibold">
                      Phone
                    </div>
                    <div className="text-gray-800 font-medium">
                      {booking.customerPhone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-red-600" />
                Service Address
              </h3>
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="font-semibold text-red-700">Street:</span>
                    <span className="text-gray-800">
                      {booking.userAddress.street}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-red-700">City:</span>
                    <span className="text-gray-800">
                      {booking.userAddress.city}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-red-700">
                      Landmark:
                    </span>
                    <span className="text-gray-800">
                      {booking.userAddress.landmark}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-red-700">Pincode:</span>
                    <span className="text-gray-800">
                      {booking.userAddress.pincode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Complete Button */}

            <button
              onClick={handleCompleteButton}
              disabled={isCompleted}
              className={`
          relative px-8 py-3.5 rounded-lg font-medium text-white
          transition-all duration-300
          ${
            isCompleted
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          }
          shadow-lg hover:shadow-xl hover:-translate-y-0.5
        `}
            >
              <span className="flex items-center gap-2">
                {isCompleted ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Completed</span>
                  </>
                ) : (
                  <span>Complete Service</span>
                )}
              </span>
            </button>
          </div>
        )}
      </div>

      {loading && <Loader></Loader>}

      {showOTPModal && booking && (
        <OTPVerificationModal
          booking={booking}
          onSuccess={handleOTPSuccess}
          onCancel={handleCancelOTP}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
