import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config({ path: "../.env" });

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

userSchema.statics.findByCredentials = async function (email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("unable to login");
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new Error("invalid password");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;
    const token = jwt.sign(
      {
        _id: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", userSchema);

export default User;
