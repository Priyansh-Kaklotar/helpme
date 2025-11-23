"use client";
import { useState, useEffect } from "react";

// Glassmorphism Booking Card Component
const BookingCard = ({ booking }) => {
  // Format time function
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get status color classes
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/20 border-yellow-400/30 text-yellow-200";
      case "confirmed":
        return "bg-green-500/20 border-green-400/30 text-green-200";
      case "cancelled":
        return "bg-red-500/20 border-red-400/30 text-red-200";
      case "completed":
        return "bg-blue-500/20 border-blue-400/30 text-blue-200";
      default:
        return "bg-gray-500/20 border-gray-400/30 text-gray-200";
    }
  };

  // Get service icon
  const getServiceIcon = (category) => {
    if (!category) return "🛠️";
    switch (category.toLowerCase()) {
      case "painter":
        return "🎨";
      case "plumber":
        return "🔧";
      case "electrician":
        return "⚡";
      case "cleaner":
        return "🧹";
      case "carpenter":
        return "🪚";
      case "gardener":
        return "🌱";
      default:
        return "🛠️";
    }
  };

  return (
    <div className="group relative booking-card w-full max-w-md mx-auto mb-6">
      {/* Card Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl">
              {getServiceIcon(booking.service?.category)}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold capitalize truncate text-white">
              {booking.service?.title || "Service"}
            </h2>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(
              booking.bookingStatus
            )} whitespace-nowrap`}
          >
            {booking.bookingStatus}
          </span>
        </div>

        {/* Service Info Grid */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="info-item">
              <span className="label">Provider</span>
              <span className="value">
                {booking.serviceProvider?.name || "N/A"}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Category</span>
              <span className="value">
                {booking.service?.category || "N/A"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="info-item">
              <span className="label">Booking Date</span>
              <span className="value">
                {new Date(booking.bookingTime).toLocaleDateString()}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Booking Time</span>
              <span className="value">{formatTime(booking.bookingTime)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="info-item">
              <span className="label">Created At</span>
              <span className="value">{formatTime(booking.createdAt)}</span>
            </div>
            <div className="info-item">
              <span className="label">Phone</span>
              <span className="value">{booking.customerPhone || "N/A"}</span>
            </div>
          </div>

          {/* Price - Full Width */}
          <div className="info-item price-item">
            <span className="label">Total Amount</span>
            <span className="price">₹{booking.service?.price || 0}</span>
          </div>
        </div>

        {/* Address Section */}
        {booking.userAddress && (
          <div className="address-section">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📍</span>
              <h3 className="font-semibold text-yellow-200">
                Your Service Address
              </h3>
            </div>
            <div className="text-sm space-y-1 text-white/90">
              <div>{booking.userAddress.street}</div>
              <div>
                {booking.userAddress.city} - {booking.userAddress.pincode}
              </div>
              {booking.userAddress.landmark && (
                <div className="text-white/70">
                  <span className="font-medium">Landmark:</span>{" "}
                  {booking.userAddress.landmark}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Shimmer Effect */}
      <div className="shimmer"></div>
    </div>
  );
};

// Loading Component
const LoadingCard = () => (
  <div className="booking-card animate-pulse w-full max-w-md mx-auto mb-6">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
        <div className="w-32 h-6 bg-white/20 rounded"></div>
      </div>
      <div className="w-20 h-6 bg-white/20 rounded-full"></div>
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between">
          <div className="w-20 h-4 bg-white/20 rounded"></div>
          <div className="w-24 h-4 bg-white/20 rounded"></div>
        </div>
      ))}
      <div className="w-full h-20 bg-white/20 rounded-lg mt-4"></div>
    </div>
  </div>
);

// Main BookingsPage Component
export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/customer/bookings");
      const data = await response.json();
      // console.log("booking = ", data);
      if (data.success) {
        setBookings(data.bookings);
        setError(null);
      } else {
        setError("Failed to fetch bookings");
      }
    } catch (error) {
      // console.error("Error fetching bookings:", error);
      setError("Error fetching bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">
            My Bookings
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="booking-card text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-white/80 mb-6">{error}</p>
          <button
            onClick={fetchBookings}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg border border-white/30 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="booking-card text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-xl font-bold text-white mb-4">
              No Bookings Yet
            </h2>
            <p className="text-white/80">
              {`You haven't made any bookings yet. Start exploring our services!`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .booking-card {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.05)
          );
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 20px;
          padding: 24px;
          color: white;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1),
            0 5px 15px rgba(0, 0, 0, 0.05);
          transform: translateY(0);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .booking-card {
            padding: 30px;
          }
        }

        .booking-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2),
            0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .shimmer {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transform: rotate(45deg);
          transition: all 0.5s;
          opacity: 0;
          pointer-events: none;
        }

        .group:hover .shimmer {
          animation: shimmer 1.5s ease-in-out;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
            opacity: 0;
          }
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .price-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 12px 0;
        }

        .label {
          font-weight: 600;
          opacity: 0.9;
          font-size: 0.875rem;
        }

        .value {
          font-weight: bold;
          font-size: 0.875rem;
          text-align: right;
          word-break: break-all;
        }

        @media (max-width: 639px) {
          .info-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .value {
            text-align: left;
          }
        }

        .price {
          font-size: 1.5rem;
          color: #fde047;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          font-weight: bold;
        }

        .address-section {
          background: rgba(255, 255, 255, 0.08);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Mobile optimizations */
        @media (max-width: 480px) {
          .booking-card {
            padding: 20px;
            border-radius: 16px;
          }

          .price {
            font-size: 1.25rem;
          }

          .address-section {
            padding: 12px;
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .booking-card,
          .shimmer {
            transition: none !important;
            animation: none !important;
          }

          .booking-card:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
