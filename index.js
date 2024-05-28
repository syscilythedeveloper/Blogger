import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let blogPosts = [];
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/allPosts", (req, res) => {
  res.render("allPosts.ejs", { blogPosts: blogPosts });
});

app.post("/submit", (req, res) => {
  //console.log(req.body.blogPost);
  const newPost = req.body.blogPost;

  function savePost(post) {
    blogPosts.push(newPost);
    console.log(blogPosts);
  }
  savePost();
});

app.get("/deletePost", (req, res) => {
  const removal = req.query.postNumber;
  console.log("--------------");
  console.log(removal);
  blogPosts.splice(removal, 1);
  res.render("allPosts.ejs", { blogPosts: blogPosts });
});

app.get("/editPost", (req, res) => {
  const originalPost = blogPosts[req.query.postNumber];
  const postId = req.query.postNumber;

  res.render("editPosts.ejs", {
    originalPost: originalPost,
    postId: postId,
  });
});

app.post("/editPost", (req, res) => {
  const editedPost = req.body.editedPost;
  const postId = parseInt(req.body.postId, 10);

  console.log("Edited Post", editedPost);
  console.log("Post Id", postId);

  blogPosts[postId] = editedPost;
  console.log(blogPosts);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
