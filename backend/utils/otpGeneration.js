const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { generateToken } = require("./token");
const { sendMail } = require("./mailService");

async function generateOTP(userData) {
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  userData.otp = verificationCode;
  userData.otpExpires = otpExpires;
  await userData.save();

  const message = `
  <div style="max-width: 500px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background-color: #ff4d4d; color: #ffffff; padding: 24px; text-align: center;">
      <h2 style="margin: 0; font-size: 22px;">Account Verification 🔐</h2>
    </div>

    <!-- Body Content -->
    <div style="padding: 30px 24px; text-align: center;">
      <p style="color: #333333; font-size: 16px; margin-top: 0; text-align: left;">Hi <strong>${userData.name}</strong>,</p>
      <p style="color: #555555; font-size: 15px; line-height: 1.5; text-align: left;">
        Thank you for choosing E-Shop! Please use the verification code below to complete your request:
      </p>
      
      <!-- Prominent OTP Box -->
      <div style="margin: 25px auto; padding: 16px 24px; background-color: #fef2f2; border: 1px dashed #ff4d4d; border-radius: 8px; display: inline-block;">
        <span style="font-size: 28px; font-weight: 700; letter-spacing: 6px; color: #ff4d4d;">${verificationCode}</span>
      </div>
      
      <!-- Expiry Notice -->
      <p style="color: #888888; font-size: 13px; margin-top: 10px;">
        ⏳ This code will expire in <strong style="color: #555555;">10 minutes</strong>.
      </p>

      <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 24px 0;" />
      
      <!-- Security Warning -->
      <p style="color: #666666; font-size: 13px; text-align: left; margin: 0; line-height: 1.4;">
        If you did not request this verification, please safely ignore this email. Someone may have typed your email address by mistake.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8f9fa; color: #888888; text-align: center; padding: 16px; font-size: 12px; border-top: 1px solid #eeeeee;">
      <p style="margin: 0;">&copy; Team E-Shop. All rights reserved.</p>
    </div>
  </div>
`;
  await sendMail(userData.email, "Your Verification Code - E-Shop", message);

  return verificationCode;
}

async function resendOTP(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email parameter is required" });
    }
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
    if (userData.isVerified) {
      return res
        .status(400)
        .json({ message: "Account is already verified. Please log in." });
    }
    await generateOTP(userData);
    return res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.log("OTP resend error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ message: "Email and OTP parameters are required" });
    }
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
    if (userData.isVerified) {
      return res
        .status(400)
        .json({ message: "Account is already verified. Please log in." });
    }
    if (userData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (userData.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    userData.isVerified = true;
    userData.otp = undefined;
    userData.otpExpires = undefined;
    await userData.save();
    const token = await generateToken(userData);
    res.cookie("user", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      id: userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    });
  } catch (error) {
    console.log("OTP verification error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { generateOTP, resendOTP, verifyOTP };
