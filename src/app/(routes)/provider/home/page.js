"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProviderHomeV3() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [providerDetails, setProviderDetails] = useState({});
  const [pendingServiceCount, setPendingServiceCount] = useState(0);
  const [allServicesCount, setAllServicesCount] = useState(0);
  const [completeServiceCount, setCompleteServiceCount] = useState(0);

  useEffect(() => {
    async function confirmServiceFetch() {
      try {
        const response = await axios.get("/api/provider/confirmbooking");
        const data = response.data;
        console.log(data.confirmService);
        setPendingBookings(data.confirmService);
      } catch (error) {
        console.log(
          "error in the confirm service fetch in useEffect in provider/home"
        );
      }
    }

    async function providerDetail() {
      try {
        const response = await axios.get("/api/provider/profile");
        const data = response.data;
        setProviderDetails(data.user);
        setServices(data.user.allService);
        console.log(data.user);

        const allServiceCount = data.user.allService.length;
        const pendingServiceC = data.user.confirmService.length;
        const completeServiceC = data.user.completedService.length;
        setAllServicesCount(allServiceCount);
        setPendingServiceCount(pendingServiceC);
        setCompleteServiceCount(completeServiceC);
      } catch (error) {
        console.log("Error in the Provider Details Route : ", error.message);
      }
    }

    confirmServiceFetch();
    providerDetail();
  }, []);

  const categoryEmojis = {
    Cleaner: "🧹",
    Electrician: "⚡",
    Plumber: "🔧",
    Painter: "🎨",
  };

  const getDateLabel = (dateString) => {
    const targetDate = new Date(dateString);
    const today = new Date();

    // Normalize both dates (ignore hours/min/sec)
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Calculate difference
    const diffInMs = targetDate - today;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 0) {
      return `${diffInDays} days later`;
    } else if (diffInDays === 0) {
      return "Today";
    } else {
      return `Missed : ${Math.abs(diffInDays)} days Ago`;
    }
  };

  // const allServiceCount = providerDetails.allService.length;
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
              {`Good morning,`} {providerDetails.name}
              {`!`}
            </h1>
            <p className="text-gray-600">{`Let's make today productive 💪`}</p>
          </div>
          <button
            onClick={() => navigate.push("/provider/createService")}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Plus size={20} />
            New Service
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-500">
          <div className="text-emerald-600 mb-2">
            <TrendingUp size={28} />
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Services</p>
          <p className="text-2xl font-bold text-gray-800">{allServicesCount}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
          <div className="text-blue-600 mb-2">
            <Clock size={28} />
          </div>
          <p className="text-gray-600 text-sm mb-1">Pending</p>
          <p className="text-2xl font-bold text-gray-800">
            {pendingServiceCount}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
          <div className="text-green-600 mb-2">
            <CheckCircle size={28} />
          </div>
          <p className="text-gray-600 text-sm mb-1">Completed</p>
          <p className="text-2xl font-bold text-gray-800">
            {completeServiceCount}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500">
          <div className="text-yellow-600 mb-2">
            <Star size={28} />
          </div>
          <p className="text-gray-600 text-sm mb-1">Rating</p>
          <p className="text-2xl font-bold text-gray-800">4.9</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Services */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Your Services</h2>
              <button className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1">
                View All
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={service._id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {categoryEmojis[service.category]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500">{service.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">
                      ₹{service.price}
                    </p>
                    <p className="text-xs text-gray-500">
                      {service.bookings} bookings
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors font-medium text-sm">
                    Edit
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate.push("/provider/createService")}
              className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 font-medium"
            >
              + Add Another Service
            </button>
          </div>
        </div>

        {/* Right Column - Upcoming Bookings */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Upcoming Bookings
              </h2>
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {pendingBookings.length} pending
              </span>
            </div>
            <div className="space-y-3">
              {pendingBookings
                .sort(
                  (a, b) => new Date(a.bookingDate) - new Date(b.bookingDate)
                )
                .slice(0, showAllBookings ? pendingBookings.length : 3)
                .map((booking, index) => {
                  return (
                    <div
                      key={booking._id}
                      className="relative p-4 bg-gradient-to-r from-cyan-50 via-teal-50 to-emerald-50 rounded-xl border-l-4 border-emerald-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {booking.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {booking.user.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {booking.user.address}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs bg-emerald-500 text-white px-2.5 py-1 rounded-full font-medium shadow-sm">
                          {getDateLabel(booking.bookingDate)}
                        </span>
                      </div>

                      <div className="bg-white rounded-lg p-3 mb-2 border border-gray-100">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-semibold text-gray-800">
                            {booking.service.title}
                          </p>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {booking.service.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {booking.service.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-emerald-600">
                            <Clock size={16} />
                            <span className="text-sm font-medium">
                              {booking.timeSlot}
                            </span>
                          </div>
                          <div className="text-sm font-bold text-emerald-700">
                            ₹{booking.totalAmount}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            navigate.push(
                              `/provider/viewBooking/${booking._id}`
                            )
                          }
                          className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                        >
                          View Details
                        </button>
                      </div>

                      {booking.specialRequirements && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Note:</span>{" "}
                            {booking.specialRequirements}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
            {pendingBookings.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No upcoming bookings</p>
              </div>
            )}
            <button
              onClick={() => setShowAllBookings(!showAllBookings)}
              className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              {showAllBookings ? `Show Less` : `View All Booking`}
            </button>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6 border border-amber-200">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              💡 Quick Tip
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Keep your services updated with clear descriptions and competitive
              pricing to attract more customers!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
