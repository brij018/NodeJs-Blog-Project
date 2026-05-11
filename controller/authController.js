import User from "../model/User.js";
import HttpError from "../middleware/HttpError.js";

const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(new HttpError("user already exists with this email or username", 400));
    }

    const newUser = new User({
      username,
      email,
      password,
      role: role || "user",
    });

    await newUser.save();
    res.redirect("/login?message=Registration successful, please login");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return next(new HttpError("unable to login", 400));
    }
    const token = await user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("/articles");
  } catch (error) {
    next(new HttpError("invalid credentials", 400));
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.redirect("/login?message=logged out successfully");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const renderLogin = (req, res) => {
  res.render("login", { message: req.query.message || null, user: null });
};

const renderRegister = (req, res) => {
  res.render("register", { user: null });
};

export default { register, login, logout, renderLogin, renderRegister };
