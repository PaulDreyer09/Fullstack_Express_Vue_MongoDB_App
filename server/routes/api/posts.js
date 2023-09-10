const express = require('express');
const router = express.Router();
const Post = require('../../models/post');

//Create a new post
router.post('/', (req, res) => {
  const {title, content} = req.body;
  const post = new Post({
    title: title,
    content: content,
  });

  post.save()
  .then(savedPost => {
    res.status(201).json(savedPost);
  })
  .catch(err => {
    res.status(500).json({ error: 'Error saving post' });
  });
})

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error getting posts' });
  }
})

// Get Posts
// router.get('/', async (req, res) => {
//     const posts = loadPostsCollection();
//     if (posts.length){
//       res.send({ "posts": posts });
//     }
//     else {
//       res.send({ "posts": [] });
//     }
// })

// Add Post
// router.post('/', async(req, res) => {
//   const posts = await Post.find();
//   const post = await Post.create({
//     title: req.body.title,
//     content: "Some content",
//   }).then((data) => {
//     console.log(data);
//   })
//   res.status(201).send();
// })


// Delete Post

const loadPostsCollection = async () => {
  try {
    const posts = await Post.find();
    return posts;
  } catch (e) {
    console.error(e.message);
  }
}


module.exports = router;
