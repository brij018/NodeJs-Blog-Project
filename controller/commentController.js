import Comment from "../model/Comment.js";
import Article from "../model/Article.js";
import HttpError from "../middleware/HttpError.js";

const addComment = async (req, res, next) => {
  try {
    const { text, articleId } = req.body;
    const comment = new Comment({
      text,
      author: req.user._id,
      article: articleId,
    });
    await comment.save();

    await Article.findByIdAndUpdate(articleId, { $push: { comments: comment._id } });

    res.redirect(`/articles/view/${articleId}`);
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return next(new HttpError("comment not found", 404));
    }

    if (
      comment.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(new HttpError("not authorized", 403));
    }

    await comment.deleteOne();
    await Article.findByIdAndUpdate(comment.article, { $pull: { comments: comment._id } });

    res.redirect(`/articles/view/${comment.article}`);
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { addComment, deleteComment };
