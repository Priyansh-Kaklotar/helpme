"use client";
import { useState, useEffect, useRef } from "react";
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
  AlertCircle,
  Mail,
  RefreshCw,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/src/components/Loader/page";

// OTP Verification Modal Component
export default function OTPVerificationModal({ booking, onSuccess, onCancel }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [resendCooldown, setResendCooldown] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(5);

  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(
      () => setResendCooldown((prev) => prev - 1),
      1000
    );
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && value) {
      const otpString = [...newOtp.slice(0, 5), value].join("");
      if (otpString.length === 6) {
        setTimeout(() => handleVerify(otpString), 100);
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    while (newOtp.length < 6) newOtp.push("");

    setOtp(newOtp);
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();

    if (pastedData.length === 6) {
      setTimeout(() => handleVerify(pastedData), 100);
    }
  };

  // Verify OTP
  const handleVerify = async (otpString = otp.join("")) => {
    if (otpString.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }

    if (timeLeft <= 0) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/otp/verify", {
        bookingId: booking._id,
        otp: otpString,
      });

      const data = response.data;
      // console.log("inserted OTP : ", otpString, typeof otpString);
      // console.log("data in the verify otp : ", data);

      if (response.status === 200 && data.success) {
        setSuccess("Service completed successfully!");
        setTimeout(() => {
          onSuccess && onSuccess(data);
        }, 1500);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
        setAttemptsLeft(data.attemptsRemaining || attemptsLeft - 1);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error. Please try again."
      );
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/otp/resend", {
        bookingId: booking._id,
      });

      const data = response.data;

      if (response.status === 200 && data.success) {
        setSuccess("New OTP sent to customer email!");
        setTimeLeft(600);
        setResendCooldown(120);
        setOtp(["", "", "", "", "", ""]);
        setAttemptsLeft(5);
        inputRefs.current[0]?.focus();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-slideUp relative">
        {/* Close Button */}
        <button
          onClick={onCancel}
          disabled={loading || success}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verify Service Completion
          </h2>
          <p className="text-gray-600 text-sm mb-1">
            OTP has been sent to customer
          </p>
          <p className="text-indigo-600 font-medium">
            {booking?.user?.email || booking?.customerPhone}
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-3 text-center">
            Enter 6-digit OTP from customer
          </label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={loading || success}
                className="w-12 h-14 text-center text-2xl font-bold border-2 text-black border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all disabled:bg-gray-100"
              />
            ))}
          </div>
        </div>

        {/* Timer and Attempts */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <div className="text-gray-600">
            Time:
            <span
              className={`font-bold ml-1 ${
                timeLeft < 60 ? "text-red-500" : "text-indigo-600"
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="text-gray-600">
            Attempts:
            <span
              className={`font-bold ml-1 ${
                attemptsLeft <= 2 ? "text-red-500" : "text-gray-800"
              }`}
            >
              {attemptsLeft}/5
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={() => handleVerify()}
          disabled={
            loading || otp.join("").length !== 6 || success || timeLeft <= 0
          }
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mb-4"
        >
          {loading ? "Verifying..." : "Verify & Complete Service"}
        </button>

        {/* Resend OTP */}
        <div className="text-center mb-4">
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0 || loading || success}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm disabled:text-gray-400 disabled:cursor-not-allowed inline-flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {resendCooldown > 0
              ? `Resend in ${formatTime(resendCooldown)}`
              : "Resend OTP to Customer"}
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            Ask the customer for the OTP sent to their email. Only enter it
            after confirming the service is completed.
          </p>
        </div>
      </div>
    </div>
  );
}
