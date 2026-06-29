const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utils/helpers");


// Register


exports.register = asyncHandler(async (req, res) => {

  try {

    console.log("BODY:", req.body);

    const user = new User(req.body);

    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (err) {

    console.log("REGISTER ERROR:", err);

    throw err;

  }

});

// Login


exports.login = asyncHandler(async (req, res) => {

  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {

    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });

  }

  // Generate JWT Token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.json({

    success: true,

    token,

    user: {

      _id: user._id,

      name: user.name,

      email: user.email,

      phone: user.phone,

      address: user.address,

      profileImage: user.profileImage,

    },

  });

});


// Get Profile


exports.getProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)
    .select("-password");

  if (!user) {

    return res.status(404).json({

      success: false,

      message: "User not found",

    });

  }

  res.json({

    success: true,

    user: {

      _id: user._id,

      name: user.name,

      email: user.email,

      phone: user.phone,

      address: user.address,

      profileImage: user.profileImage,

    },

  });

});


// Update Profile


exports.updateProfile = asyncHandler(async (req, res) => {

  const {

    name,

    phone,

    address,

    profileImage,

  } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {

    return res.status(404).json({

      success: false,

      message: "User not found",

    });

  }

  user.name = name || user.name;

  user.phone = phone || user.phone;

  user.address = address || user.address;

  user.profileImage =
    profileImage || user.profileImage;

  await user.save();

  res.json({

    success: true,

    message: "Profile Updated Successfully",

    user,

  });

});