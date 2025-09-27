"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  User,
  Mail,
  Star,
  Heart,
  Share2,
  MessageCircle,
  Phone,
  ArrowLeft,
} from "lucide-react";
import Loader from "@/src/components/Loader/page";
import BookingForm from "@/src/components/bookingForm/page";

const page = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [Service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addToWish, setAddToWish] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Function to check if service is in wishlist
  const checkWishlistStatus = async () => {
    try {
      const res = await axios.get(`/api/customer/wishlist`);
      const wishlistItems = res.data;

      const list = wishlistItems.wishList;
      console.log("list = ", list);
      const exists = list.includes(id);
      console.log("\nIs in Wish List = ", exists);
      setAddToWish(exists);
    } catch (error) {
      console.log("Error checking wishlist status:", error);
    }
  };

  const handleBookService = (service) => {
    setSelectedService(service);
    setShowBookingForm(true);
  };

  useEffect(() => {
    async function Get_Service() {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/services/${id}`);
        const data = res.data;
        console.log(data);
        setService(data);
        await checkWishlistStatus();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    Get_Service();
  }, [id]);

  // async function handleBooking() {}

  async function toggleWishList() {
    if (addToWish) {
      // remove
      try {
        const res = await axios.delete(`/api/customer/wishlist`, {
          data: { id: id },
        });
        const data = res.data;
        console.log("Service Removed from Wish List");
        console.log(data);
        setAddToWish(false);
      } catch (error) {
        console.log("Error in the special service page ", error.message);
      }
    } else {
      // add
      try {
        const res = await axios.patch(`/api/customer/wishlist`, { id });
        const data = res.data;
        console.log("Service added to Wish List");
        console.log(data);
        setAddToWish(true);
      } catch (error) {
        console.log("Error in the special service page ", error.message);
      }
    }
  }

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (!Service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Service not found
          </h2>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to All Services</span>
        </button>
      </div>

      {/* Animated Liquid Card */}
      <div className="max-w-4xl mx-auto">
        <div className="relative p-8 bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
          {/* Animated liquid background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-96 h-96 bg-white rounded-full -top-48 -left-48 animate-pulse transform rotate-45"></div>
            <div className="absolute w-80 h-80 bg-cyan-300 rounded-full -bottom-40 -right-40 animate-bounce transform rotate-12"></div>
            <div className="absolute w-64 h-64 bg-blue-300 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin"></div>
          </div>

          {/* Floating bubbles */}
          <div className="absolute top-16 left-16 w-8 h-8 bg-white/20 rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-4 h-4 bg-white/30 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-20 left-24 w-6 h-6 bg-white/25 rounded-full animate-float"></div>

          <div className="relative z-10">
            {/* Flowing header */}
            <div className="text-center mb-8">
              <div className="inline-block mb-4 px-6 py-2 bg-white/20 backdrop-blur-lg rounded-full text-white font-medium animate-pulse">
                🎨 {Service.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg animate-bounce-gentle capitalize">
                {Service.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                {Service.description}
              </p>
            </div>

            {/* Liquid price container */}
            <div className="relative mb-8">
              <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20">
                <div className="text-center">
                  <div className="text-5xl md:text-7xl font-black text-white mb-2 animate-pulse">
                    ${Service.price}
                  </div>
                  <div className="text-white/80 text-lg">
                    Complete Service Package
                  </div>
                </div>

                {/* Animated waves */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-b-3xl animate-wave"></div>
              </div>
            </div>

            {/* Service Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Service Features */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                  <span className="mr-2">✨</span>
                  Service Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-white/90">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                    <span>Professional Quality Work</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                    <span>Fast & Reliable Service</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                    <span>Customer Satisfaction Guaranteed</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                    <span>24/7 Support Available</span>
                  </div>
                </div>
              </div>

              {/* Service Stats */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Service Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      4.9
                    </div>
                    <div className="text-white/80 text-sm">Rating</div>
                    <div className="flex justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      156
                    </div>
                    <div className="text-white/80 text-sm">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      98%
                    </div>
                    <div className="text-white/80 text-sm">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      24h
                    </div>
                    <div className="text-white/80 text-sm">Avg Response</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider section with liquid effect */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                <span className="mr-2">👨‍🎨</span>
                Meet Your Service Provider
              </h3>
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-bold text-2xl">
                        {Service.providerName?.name?.[0]?.toUpperCase() || "P"}
                      </span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg capitalize">
                      {Service.providerName?.name || "Provider Name"}
                    </h4>
                    <p className="text-white/80 break-all">
                      {Service.providerName?.email || "email@example.com"}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-white/80 text-sm">Online now</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm flex items-center space-x-2">
                    <MessageCircle size={18} />
                    <span>Chat</span>
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm flex items-center space-x-2">
                    <Mail size={18} />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Animated CTA buttons */}
            <div className="space-y-4">
              <button
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white py-4 px-8 rounded-2xl font-bold border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                onClick={() => handleBookService(id)}
              >
                🚀 Book This Service
              </button>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center justify-center space-x-2"
                  onClick={toggleWishList}
                >
                  <Heart size={18} fill={addToWish ? "red" : "transparent"} />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center justify-center space-x-2">
                  <Share2 size={18} />
                  <span>Share Service</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes wave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }
      `}</style>

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
};

export default page;
