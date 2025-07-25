import mongoose from 'mongoose'

const OtpSchema = new mongoose.Schema({
    email : String,
    otp : String,
    expireAt : Date,
    used : Boolean
});

export default mongoose.models.Otp || mongoose.model('Otp' , OtpSchema) ;