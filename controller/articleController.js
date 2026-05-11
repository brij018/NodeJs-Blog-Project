import Article from "../model/Article.js";
import User from "../model/User.js";
import HttpError from "../middleware/HttpError.js";

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find().populate("author", "username");
    res.render("articleList", { articles, user: req.user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getMyArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ author: req.user._id }).populate("author", "username");
    res.render("myArticles", { articles, user: req.user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getArticleForm = async (req, res, next) => {
  try {
    let article = null;
    if (req.params.id) {
      article = await Article.findById(req.params.id);
      if (!article) {
        return next(new HttpError("article not found", 404));
      }
      if (
        article.author.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return next(new HttpError("not authorized", 403));
      }
    }
    res.render("articleForm", { article, user: req.user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const createArticle = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const article = new Article({
      title,
      content,
      author: req.user._id,
    });
    await article.save();

    await User.findByIdAndUpdate(req.user._id, { $push: { articles: article._id } });

    res.redirect("/articles");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const article = await Article.findById(req.params.id);

    if (!article) {
      return next(new HttpError("article not found", 404));
    }

    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(new HttpError("not authorized", 403));
    }

    article.title = title;
    article.content = content;
    await article.save();

    res.redirect("/articles/my");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return next(new HttpError("article not found", 404));
    }

    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(new HttpError("not authorized", 403));
    }

    await article.deleteOne();
    await User.findByIdAndUpdate(article.author, { $pull: { articles: article._id } });

    res.redirect("/articles");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username" },
      });

    if (!article) {
      return next(new HttpError("article not found", 404));
    }

    res.render("articleItem", { article, user: req.user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  getAllArticles,
  getMyArticles,
  getArticleForm,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleById,
};
