"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Main_navbar from "@/src/components/main-navbar/page";
import BookingForm from "@/src/components/bookingForm/page";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await axios.get("/api/customer/wishlist");
        const data = response.data;
        setWishlist(data.wishList);
        console.log("data", data);
        console.log("wishlist : ", data.wishList);
      } catch (error) {
        console.log("Error in the Wishlist Frontend");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  const handleBookService = (service) => {
    setSelectedService(service);
    setShowBookingForm(true);
  };

  const handleRemoveFromWishlist = async (serviceId, serviceTitle) => {
    if (!confirm(`Remove "${serviceTitle}" from wishlist?`)) return;

    try {
      const response = await axios.delete("/api/customer/wishlist", {
        data: { id: serviceId },
      });

      if (response.data.success) {
        setWishlist((prevWishlist) =>
          prevWishlist.filter((service) => service._id !== serviceId)
        );
        alert("Service removed from wishlist!");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove from wishlist. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500">
        <div className="text-white text-xl">Loading your wishlist...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            💜 My Wishlist
          </h1>
          <p className="text-white/80 text-lg">
            {wishlist.length} service{wishlist.length !== 1 ? "s" : ""} in your
            wishlist
          </p>
        </div>

        {/* Wishlist Cards */}
        {wishlist.length === 0 ? (
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">💔</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Empty Wishlist
              </h3>
              <p className="text-white/80 mb-6">
                You haven't added any services to your wishlist yet.
              </p>
              <button
                onClick={() => window.history.back()}
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
              >
                Browse Services
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((service, index) => (
              <WishlistCard
                key={service._id}
                service={service}
                onBook={() => handleBookService(service._id, service.title)}
                onRemove={() =>
                  handleRemoveFromWishlist(service._id, service.title)
                }
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {showBookingForm && selectedService && (
        <BookingForm
          service={selectedService}
          onClose={() => {
            setShowBookingForm(false);
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
}

// Wishlist Card Component
function WishlistCard({ service, onBook, onRemove, index }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove();
    setIsRemoving(false);
  };

  return (
    <div
      className="wishlist-card group"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Service Category Badge */}
      <div className="service-category">{service.category}</div>

      {/* Service Title */}
      <h3 className="service-title">{service.title}</h3>

      {/* Service Description */}
      <p className="service-description">{service.description}</p>

      {/* Service Price */}
      <div className="service-price">
        ₹{service.price?.toLocaleString() || "N/A"}
      </div>

      {/* Action Buttons */}
      <div className="card-actions">
        <button className="btn-book" onClick={onBook}>
          Book Service
        </button>
        <button
          className="btn-remove"
          onClick={handleRemove}
          disabled={isRemoving}
          title="Remove from wishlist"
        >
          {isRemoving ? "⏳" : "💜"}
        </button>
      </div>

      <style jsx>{`
        .wishlist-card {
          background: linear-gradient(
            135deg,
            #667eea 0%,
            #764ba2 50%,
            #f093fb 100%
          );
          border-radius: 20px;
          padding: 30px;
          position: relative;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease forwards;
        }

        .wishlist-card::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
          pointer-events: none;
        }

        .wishlist-card:hover::after {
          width: 300px;
          height: 300px;
        }

        .wishlist-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 20px 40px rgba(118, 75, 162, 0.4);
        }

        .service-category {
          display: inline-block;
          background: rgba(255, 255, 255, 0.3);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          z-index: 2;
        }

        .service-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 10px;
          text-transform: capitalize;
          color: white;
          position: relative;
          z-index: 2;
        }

        .service-description {
          font-size: 0.95rem;
          margin-bottom: 20px;
          line-height: 1.5;
          opacity: 0.9;
          color: white;
          position: relative;
          z-index: 2;
        }

        .service-price {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: white;
          position: relative;
          z-index: 2;
        }

        .card-actions {
          display: flex;
          gap: 12px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .btn-book {
          flex: 1;
          background: white;
          color: #764ba2;
          padding: 12px 24px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          position: relative;
          z-index: 2;
        }

        .btn-book:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .btn-book:active {
          transform: scale(0.98);
        }

        .btn-remove {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.2rem;
          position: relative;
          z-index: 2;
        }

        .btn-remove:hover {
          background: #ff6b6b;
          transform: scale(1.1);
        }

        .btn-remove:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .wishlist-card {
            padding: 24px;
          }

          .service-title {
            font-size: 1.2rem;
          }

          .service-price {
            font-size: 1.5rem;
          }

          .card-actions {
            flex-direction: column;
            gap: 10px;
          }

          .btn-book {
            width: 100%;
          }

          .btn-remove {
            align-self: center;
          }
        }
      `}</style>
    </div>
  );
}

export default WishlistPage;
