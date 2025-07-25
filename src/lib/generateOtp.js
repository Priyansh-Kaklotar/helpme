export default function genrateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString().slice(0 , 6);
}