import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
      required: true,
    },
    otpCode: {
      type: String,
      required: true,
      // Store hashed OTP for security
    },
    otpType: {
      type: String,
      enum: ["SERVICE_COMPLETION"],
      default: "SERVICE_COMPLETION",
    },
    email: {
      type: String,
      required: true,
    },
    attemptsRemaining: {
      type: Number,
      default: 5,
      min: 0,
    },
    isUsed: {
      type: Boolean,
      default: false,
      index: true,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
      // Set to 10 minutes from creation
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    lastAttemptAt: {
      type: Date,
      default: null,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // TTL index - auto delete after 1 hour (in seconds)
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
otpSchema.index({ bookingId: 1, isUsed: 1, expiresAt: 1 });

// Index for automatic cleanup
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

// Pre-save middleware to update timestamps
otpSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Method to check if OTP is valid
otpSchema.methods.isValidOtp = function () {
  return (
    !this.isUsed &&
    !this.isExpired &&
    this.attemptsRemaining > 0 &&
    this.expiresAt > new Date()
  );
};

// Static method to generate OTP
otpSchema.statics.generateOTP = function () {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export default mongoose.models.ServiceCompleteOTP ||
  mongoose.model("ServiceCompleteOTP", otpSchema);
