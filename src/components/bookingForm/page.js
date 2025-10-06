"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function BookingForm({ service, onClose }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bookingDate: "",
    timeSlot: "",
    customerAddress: {
      street: "",
      city: "",
      pincode: "",
      landmark: "",
    },
    customerPhone: "",
    specialRequirements: "",
  });
  const [loading, setLoading] = useState(false);
  const [serviceDetails, setServiceDetails] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("service id = ", service);
      const response = await axios.post("/api/customer/bookings", {
        serviceId: service,
        ...formData,
      });
      console.log(response.data);

      if (response.data.success) {
        // Show success animation
        setCurrentStep(4);
        setTimeout(() => {
          router.push("/customer/bookservice");
          onClose?.();
        }, 2000);
      }

      console.log("submited form data = ", formData);
    } catch (error) {
      alert("Error creating booking. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function serviceDetails() {
      try {
        // api/service/service
        console.log("service : ", service);
        const response = await axios.get(`/api/services/${service}`);
        const data = response.data;
        setServiceDetails(data);
      } catch (error) {
        console.log("error in the booking form page");
        console.log(error.message);
      }
    }

    serviceDetails();
  }, []);

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.bookingDate && formData.timeSlot;
      case 2:
        return (
          formData.customerAddress.street &&
          formData.customerAddress.city &&
          formData.customerAddress.pincode &&
          formData.customerPhone
        );
      case 3:
        return true; // Review step
      default:
        return false;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-indigo-900/50 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="booking-form-container animate-slideInScale">
          {/* Header */}
          <div className="booking-header">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  ✨ Book Your Service
                </h2>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`step-indicator ${
                        currentStep >= step ? "active" : ""
                      }`}
                    >
                      {step === 4 ? "🎉" : step}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={onClose} className="close-button">
                <span className="text-xl">×</span>
              </button>
            </div>
          </div>

          {/* Service Info Card */}
          <div className="service-info-card">
            <div className="service-icon">
              {service.category === "Electrician"
                ? "⚡"
                : service.category === "Plumber"
                ? "🔧"
                : service.category === "Cleaner"
                ? "🧹"
                : service.category === "Painter"
                ? "🎨"
                : "🛠️"}
            </div>
            <div className="service-details">
              <h3 className="service-title">{serviceDetails.title}</h3>
              <p className="service-description">
                {serviceDetails.description}
              </p>
              <div className="service-price">₹{serviceDetails.price}</div>
            </div>
          </div>

          {/* Form Steps */}
          <form onSubmit={handleSubmit} className="booking-form text-black">
            {/* Step 1: Date & Time */}
            {currentStep === 1 && (
              <div className="step-content animate-slideIn text-black">
                <h3 className="step-title">📅 When do you need the service?</h3>

                <div className="form-group text-black">
                  <label className="form-label">
                    <span className="label-icon">📅</span>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.bookingDate}
                    onChange={(e) =>
                      setFormData({ ...formData, bookingDate: e.target.value })
                    }
                    className="form-input "
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">🕐</span>
                    Time Slot
                  </label>
                  <div className="time-slots">
                    {[
                      {
                        value: "09:00-12:00",
                        label: "🌅 Morning",
                        time: "9:00 AM - 12:00 PM",
                      },
                      {
                        value: "12:00-15:00",
                        label: "☀️ Afternoon",
                        time: "12:00 PM - 3:00 PM",
                      },
                      {
                        value: "15:00-18:00",
                        label: "🌤️ Evening",
                        time: "3:00 PM - 6:00 PM",
                      },
                      {
                        value: "18:00-21:00",
                        label: "🌙 Night",
                        time: "6:00 PM - 9:00 PM",
                      },
                    ].map((slot) => (
                      <div
                        key={slot.value}
                        className={`time-slot ${
                          formData.timeSlot === slot.value ? "selected" : ""
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, timeSlot: slot.value })
                        }
                      >
                        <div className="slot-label">{slot.label}</div>
                        <div className="slot-time">{slot.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact & Address */}
            {currentStep === 2 && (
              <div className="step-content animate-slideIn">
                <h3 className="step-title">📍 Where should we reach you?</h3>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📱</span>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    value={formData.customerPhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customerPhone: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="address-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">🏠</span>
                      Street Address
                    </label>
                    <input
                      type="text"
                      placeholder="House/Building, Street"
                      required
                      value={formData.customerAddress.street}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerAddress: {
                            ...formData.customerAddress,
                            street: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">🏙️</span>
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Your city"
                      required
                      value={formData.customerAddress.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerAddress: {
                            ...formData.customerAddress,
                            city: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">📮</span>
                      Pincode
                    </label>
                    <input
                      type="number"
                      placeholder="6-digit pincode"
                      required
                      value={formData.customerAddress.pincode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerAddress: {
                            ...formData.customerAddress,
                            pincode: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">📍</span>
                      Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="Near... (Optional)"
                      value={formData.customerAddress.landmark}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerAddress: {
                            ...formData.customerAddress,
                            landmark: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Special Requirements */}
            {currentStep === 3 && (
              <div className="step-content animate-slideIn">
                <h3 className="step-title">✏️ Any special requirements?</h3>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📝</span>
                    Special Requirements
                  </label>
                  <textarea
                    placeholder="Tell us anything specific about your requirements... (Optional)"
                    rows={4}
                    value={formData.specialRequirements}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialRequirements: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>

                {/* Booking Summary */}
                <div className="booking-summary">
                  <h4 className="summary-title">📋 Booking Summary</h4>
                  <div className="summary-item">
                    <span>📅 Date:</span>
                    <span>
                      {new Date(formData.bookingDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>🕐 Time:</span>
                    <span>{formData.timeSlot}</span>
                  </div>
                  <div className="summary-item">
                    <span>📱 Phone:</span>
                    <span>{formData.customerPhone}</span>
                  </div>
                  <div className="summary-item">
                    <span>📍 Address:</span>
                    <span>
                      {formData.customerAddress.street},{" "}
                      {formData.customerAddress.city}
                    </span>
                  </div>
                  <div className="summary-item total">
                    <span>💰 Total Amount:</span>
                    <span>₹{serviceDetails.price}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {currentStep == 4 && (
              <div className="step-content success-step animate-slideIn">
                <div className="success-animation">🎉</div>
                <h3 className="success-title">Booking Confirmed!</h3>
                <p className="success-message">
                  Your booking has been created successfully. Redirecting you to
                  bookings page...
                </p>
                <div className="success-loader"></div>
              </div>
            )}

            {/* Form Actions */}
            {currentStep < 4 && (
              <div className="form-actions">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-secondary"
                  >
                    ← Previous
                  </button>
                )}

                {
                  currentStep < 3 && (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="btn-primary"
                    >
                      Next →
                    </button>
                  )
                  // : (
                  //   <button
                  //     type="submit"
                  //     disabled={loading}
                  //     className="btn-confirm"
                  //     onClick={(e) => handleSubmit(e)}
                  //   >
                  //     {loading ? (
                  //       <span className="flex items-center">
                  //         <div className="loading-spinner"></div>
                  //         Creating Booking...
                  //       </span>
                  //     ) : (
                  //       "🎯 Confirm Booking"
                  //     )}
                  //   </button>
                  // )
                }

                {currentStep == 3 && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-confirm"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <div className="loading-spinner"></div>
                        Creating Booking...
                      </span>
                    ) : (
                      "🎯 Confirm Booking"
                    )}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideInScale {
          animation: slideInScale 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .booking-form-container {
          background: linear-gradient(
            145deg,
            #667eea 0%,
            #764ba2 50%,
            #f093fb 100%
          );
          border-radius: 24px;
          padding: 2px;
          max-width: 600px;
          width: 100%;
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
        }

        .booking-header {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 24px;
          border-radius: 22px 22px 0 0;
        }

        .step-indicator {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          items-center: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .step-indicator.active {
          background: rgba(255, 255, 255, 0.9);
          color: #764ba2;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }

        .close-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: rgba(255, 99, 99, 0.8);
          transform: rotate(90deg);
        }

        .service-info-card {
          background: rgba(255, 255, 255, 0.95);
          margin: 0 2px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-radius: 0;
        }

        .service-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }

        .service-details {
          flex: 1;
        }

        .service-title {
          font-size: 20px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 4px;
          text-transform: capitalize;
        }

        .service-description {
          color: #718096;
          margin-bottom: 8px;
        }

        .service-price {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .booking-form {
          background: rgba(255, 255, 255, 0.98);
          margin: 0 2px 2px;
          padding: 32px;
          border-radius: 0 0 22px 22px;
          overflow-y: auto;
          max-height: 60vh;
        }

        .step-content {
          min-height: 300px;
        }

        .step-title {
          font-size: 24px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 24px;
          text-align: center;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .label-icon {
          font-size: 16px;
        }

        .form-input {
          width: 100%;
          padding: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .time-slots {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-top: 8px;
        }

        .time-slot {
          padding: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #fafafa;
          text-align: center;
        }

        .time-slot:hover {
          border-color: #667eea;
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
        }

        .time-slot.selected {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-color: #667eea;
          color: white;
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .slot-label {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .slot-time {
          font-size: 14px;
          opacity: 0.8;
        }

        .address-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .booking-summary {
          background: linear-gradient(135deg, #f7fafc, #edf2f7);
          padding: 20px;
          border-radius: 16px;
          margin-top: 20px;
        }

        .summary-title {
          font-size: 18px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 16px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .summary-item.total {
          font-weight: 700;
          font-size: 18px;
          border-bottom: none;
          color: #667eea;
        }

        .form-actions {
          display: flex;
          gap: 16px;
          margin-top: 32px;
        }

        .btn-secondary {
          flex: 1;
          padding: 16px 24px;
          background: #f7fafc;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          font-weight: 600;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #edf2f7;
          transform: translateY(-2px);
        }

        .btn-primary,
        .btn-confirm {
          flex: 1;
          padding: 16px 24px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          border-radius: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 16px;
        }

        .btn-primary:hover,
        .btn-confirm:hover {
          background: linear-gradient(135deg, #764ba2, #667eea);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:disabled,
        .btn-confirm:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .success-step {
          text-align: center;
          padding: 40px 20px;
        }

        .success-animation {
          font-size: 80px;
          animation: bounce 1s ease-in-out infinite alternate;
        }

        .success-title {
          color: #48bb78;
          margin: 20px 0 10px;
        }

        .success-message {
          color: #4a5568;
          margin-bottom: 24px;
        }

        .success-loader {
          width: 40px;
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          margin: 0 auto;
          overflow: hidden;
          position: relative;
        }

        .success-loader::after {
          content: "";
          position: absolute;
          top: 0;
          left: -40px;
          width: 40px;
          height: 100%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          animation: loading 2s linear infinite;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translate(-50%, -60%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-10px);
          }
        }

        @keyframes loading {
          from {
            left: -40px;
          }
          to {
            left: 100%;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .booking-form-container {
            margin: 10px;
            max-height: 95vh;
          }

          .booking-header {
            padding: 20px;
          }

          .booking-form {
            padding: 24px;
          }

          .time-slots {
            grid-template-columns: 1fr;
          }

          .address-grid {
            grid-template-columns: 1fr;
          }

          .step-title {
            font-size: 20px;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
