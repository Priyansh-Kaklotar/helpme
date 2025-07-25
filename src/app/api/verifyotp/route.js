import Otp from "@/src/models/Otp";

export async function POST(req) {
  const { email, otp } = await req.json();
  const record = await Otp.findOne({ email, otp, used: false });

  // console.log(record);
  if (!record) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid OTP" }),
      { status: 400 }
    );
  }

  if (record.expireAt < new Date()) {
    return new Response(
      JSON.stringify({ success: false, error: "OTP expired" }),
      { status: 400 }
    );
  }

  record.used = true;
  await record.save();
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
