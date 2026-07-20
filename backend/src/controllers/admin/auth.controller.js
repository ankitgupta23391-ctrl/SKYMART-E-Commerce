import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import generateOTP from "../../utils/generateOTP.js";
import sendEmail from "../../utils/sendEmail.js";
import generateToken from "../../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Step 3 - User already exists");

      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });

    try {
      await sendEmail(
        email,
        "Verify Your Account",
        `Your OTP is ${otp}`
      );

      return res.status(201).json({
        success: true,
        message: "Registration Successful",
      });
    } catch (emailError) {
      await User.deleteOne({ _id: user._id });

      console.error("OTP email send failed:", emailError.message);

      return res.status(502).json({
        success: false,
        message: "Registration failed because the OTP email could not be sent. Please check the mail configuration on the server.",
      });
    }

  } catch (error) {
    console.log("REGISTER ERROR ❌");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify otp
export const verifyOTP = async (req, res) => {
  try {
    console.log("===== VERIFY OTP API HIT =====");
    console.log(req.body);

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account already verified",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check Verification
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your account first",
      });
    }

    // Check Blocked
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT
    console.log("Login User:", user.email, user.role);
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// forgotPassword
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendEmail(
      email,
      "Reset Password OTP",
      `Your Password Reset OTP is ${otp}. It is valid for 10 minutes.`,
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// verifyForgotOTP
export const verifyForgotOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validation
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check Expiry
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// resetPassword

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    // Validation
    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // OTP check
    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP expiry check
    if (user.otpExpiry && user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GOOGLE CALLBACK
// GOOGLE CALLBACK
export const googleCallback = async (req, res) => {
  try {
    const token = jwt.sign(
      {
        id: req.user._id,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      profileImage: req.user.profileImage,
      authProvider: req.user.authProvider,
    };

    const encodedUser = encodeURIComponent(JSON.stringify(user));

    // ✅ Redirect to Vite frontend
    res.redirect(
      `https://skymart-07.netlify.app/google-success?token=${token}&user=${encodedUser}`,
    );
  } catch (error) {
    res.redirect("https://skymart-07.netlify.app/login");
  }
};

// PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Profile",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
