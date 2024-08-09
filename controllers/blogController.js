const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  const { image, name, date, description } = req.body;

  try {
    const newBlog = await Blog.create({
      image,
      name,
      date,
      description,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating a blog",
    });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });

    if (!blogs) {
      return res.status(404).json({ message: "No blogs found" });
    }

    return res.status(200).json({
      allBlogs: blogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in fetching blogs",
    });
  }
};
