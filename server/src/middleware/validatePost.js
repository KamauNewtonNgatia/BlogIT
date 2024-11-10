function validatePost(req, res, next) {
  const { image, title, excerpt, body } = req.body;

  if (!image) return res.status(400).json({ message: "image is required" });
  if (!title) return res.status(400).json({ message: "title is required" });
  if (!excerpt) return res.status(400).json({ message: "excerpt is required" });
  if (!body) return res.status(400).json({ message: "body is required" });
  next();
}

export default validatePost;
