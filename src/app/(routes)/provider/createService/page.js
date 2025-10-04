"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateServiceV3() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    isActive: "active",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const navigate = useRouter();
  const categories = [
    { name: "Cleaner", icon: "🧹", color: "from-cyan-400 to-blue-500" },
    { name: "Electrician", icon: "⚡", color: "from-yellow-400 to-orange-500" },
    { name: "Plumber", icon: "🔧", color: "from-blue-500 to-indigo-600" },
    { name: "Painter", icon: "🎨", color: "from-pink-500 to-rose-600" },
  ];

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/provider/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      //   const response = await axios

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          setFormData({
            title: "",
            description: "",
            price: "",
            category: "",
            isActive: "active",
          });
          setSuccess(false);
          setStep(1);
        }, 2500);
        navigate.push("/provider/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const canProceed = () => {
    if (step === 1) return formData.title && formData.description;
    if (step === 2) return formData.category && formData.price;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">
            Create Service
          </h1>
          <div className="flex justify-center gap-3 mt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step === i
                      ? "bg-gradient-to-br from-emerald-400 to-cyan-500 text-white scale-110 shadow-lg shadow-emerald-500/50"
                      : step > i
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {step > i ? "✓" : i}
                </div>
                {i < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                      step > i ? "bg-emerald-500" : "bg-gray-700"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 shadow-2xl">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-emerald-400 font-semibold mb-3 text-lg">
                  What service will you offer?
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-600 rounded-2xl text-white text-lg placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-all duration-300"
                  placeholder="e.g., Professional House Cleaning"
                />
              </div>

              <div>
                <label className="block text-emerald-400 font-semibold mb-3 text-lg">
                  Describe your service
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="What makes your service special? Include details about your experience and what customers can expect..."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-emerald-400 font-semibold mb-4 text-lg">
                  Select your category
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <div
                      key={cat.name}
                      onClick={() =>
                        handleChange({
                          target: { name: "category", value: cat.name },
                        })
                      }
                      className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                        formData.category === cat.name
                          ? `bg-gradient-to-br ${cat.color} border-transparent text-white scale-105 shadow-xl`
                          : "bg-gray-900/30 border-gray-600 text-gray-300 hover:border-gray-500 hover:scale-102"
                      }`}
                    >
                      <div className="text-4xl mb-2">{cat.icon}</div>
                      <div className="font-bold text-lg">{cat.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-emerald-400 font-semibold mb-3 text-lg">
                  Set your price
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-12 pr-5 py-4 bg-gray-900/50 border-2 border-gray-600 rounded-2xl text-white text-lg placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-all duration-300"
                    placeholder="500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-emerald-400 font-semibold text-lg mb-4">
                  Review Your Service
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <span className="text-gray-500">Title:</span>
                    <p className="text-white font-medium text-lg mt-1">
                      {formData.title}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Description:</span>
                    <p className="text-white mt-1">{formData.description}</p>
                  </div>
                  <div className="flex gap-6 pt-2">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <p className="text-white font-medium">
                        {formData.category}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <p className="text-white font-medium">
                        ₹{formData.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-emerald-400 font-semibold mb-4 text-lg">
                  Service Status
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="isActive"
                      value="active"
                      checked={formData.isActive === "active"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div
                      className={`p-5 rounded-2xl border-2 text-center font-bold transition-all duration-300 ${
                        formData.isActive === "active"
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 border-transparent text-white scale-105 shadow-lg"
                          : "bg-gray-900/30 border-gray-600 text-gray-400 hover:border-gray-500"
                      }`}
                    >
                      <div className="text-2xl mb-1">✓</div>
                      Active
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="isActive"
                      value="inactive"
                      checked={formData.isActive === "inactive"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div
                      className={`p-5 rounded-2xl border-2 text-center font-bold transition-all duration-300 ${
                        formData.isActive === "inactive"
                          ? "bg-gradient-to-br from-gray-600 to-gray-700 border-transparent text-white scale-105 shadow-lg"
                          : "bg-gray-900/30 border-gray-600 text-gray-400 hover:border-gray-500"
                      }`}
                    >
                      <div className="text-2xl mb-1">○</div>
                      Inactive
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-8 py-4 bg-gray-700 text-white rounded-2xl font-semibold hover:bg-gray-600 transition-all duration-300"
              >
                ← Back
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || success}
                className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  success
                    ? "bg-green-600 text-white"
                    : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-emerald-500/50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚙️</span> Creating Service...
                  </span>
                ) : success ? (
                  <span className="flex items-center justify-center gap-2">
                    <span>✓</span> Service Created!
                  </span>
                ) : (
                  "🚀 Launch Service"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
