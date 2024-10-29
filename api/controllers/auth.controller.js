import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to generate a unique username
const generateUsername = (name) => {
  return (
    name.split(" ").join("").toLowerCase() +
    Math.random().toString(36).slice(-8)
  );
};

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      username: generateUsername(req.body.username),
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      `${process.env.JWT_KEY}`,
      { expiresIn: "24h" } // Add token expiration
    );

    user.isOnline = true; // Set isOnline to true on login
    await user.save();

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 86400000, // 24 hours expiration
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    console.log("I got here")
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "Not authenticated!"));

    const decoded = jwt.verify(token, `${process.env.JWT_KEY}`);
    const user = await User.findById(decoded.id);

    if (!user) return next(createError(404, "User not found!"));

    user.isOnline = false;
    await user.save();

    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .status(200)
      .send("User has been logged out.");
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // Handle login for existing user
      user.isOnline = true; // Set isOnline to true on login
      await user.save();

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "24h" } // Add token expiration
      );
      const { password, ...rest } = user._doc;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Secure in production
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 86400000, // 24 hours expiration
        })
        .status(200)
        .send(rest);
    } else {
      // Create new user
      const generatedPassword = Math.random().toString(36).slice(-16);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const nameParts = req.body.name.trim().split(" ");
      const newUser = new User({
        username: generateUsername(req.body.name),
        fname: nameParts.length > 1 ? nameParts[0] : req.body.name,
        lname: nameParts.length > 1 ? nameParts[1] : req.body.name,
        email: req.body.email,
        password: hashedPassword,
        img: req.body.img,
        country: req.body.country,
        isOnline: true, // Set isOnline to true on new user creation
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "24h" } // Add token expiration
      );
      const { password, ...rest } = newUser._doc;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Secure in production
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 86400000, // 24 hours expiration
        })
        .status(200)
        .send(rest);
    }
  } catch (err) {
    next(err);
  }
};
