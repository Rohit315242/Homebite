const Owner = require("../models/Owner");
const jwt = require("jsonwebtoken");


// REGISTER OWNER


exports.register = async (req, res) => {

  try {

    const { email } = req.body;

    const existingOwner = await Owner.findOne({
      email,
    });

    if (existingOwner) {

      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });

    }

    const owner = new Owner(req.body);

    await owner.save();

    res.status(201).json({

      success: true,

      message: "Owner registered successfully",

    });

  } catch (err) {

    console.error("REGISTER ERROR:", err);

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};


// LOGIN OWNER


exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const owner = await Owner.findOne({
      email,
    });

    if (!owner) {

      return res.status(401).json({

        success: false,

        message: "Email not registered",

      });

    }

    if (owner.password !== password) {

      return res.status(401).json({

        success: false,

        message: "Wrong password",

      });

    }

    const token = jwt.sign(

      {

        id: owner._id,

      },

      process.env.JWT_SECRET,

      {

        expiresIn: "7d",

      }

    );

    res.json({

      success: true,

      token,

      user: {

        _id: owner._id,

        name: owner.name,

        email: owner.email,

      },

    });

  } catch (err) {

    console.error("LOGIN ERROR:", err);

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};


// GET OWNER PROFILE


exports.getProfile = async (req, res) => {

  try {

    if (!req.user?.id) {

      return res.status(401).json({

        success: false,

        message: "Unauthorized",

      });

    }

    const owner = await Owner.findById(req.user.id)
      .select("-password");

    if (!owner) {

      return res.status(404).json({

        success: false,

        message: "Owner not found",

      });

    }

    res.json({

      success: true,

      user: {

        _id: owner._id,

        name: owner.name,

        email: owner.email,

      },

    });

  } catch (err) {

    console.error("PROFILE ERROR:", err);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};