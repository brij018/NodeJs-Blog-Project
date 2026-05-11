import HttpError from "./HttpError.js";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      if (req.accepts("html")) {
        return res.redirect("/login");
      }
      return next(new HttpError("please authenticate", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      if (req.accepts("html")) {
        return res.redirect("/login");
      }
      return next(new HttpError("please authenticate", 401));
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default auth;
