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
    const posts = await loadPostsCollection();
    if(posts)
      res.status(200).json(posts);
    else
      res.status(500).json({ error: 'Error getting posts' });
})

// Delete Post
router.delete('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;

    // Use deleteOne to remove the post by ID
    const result = await Post.deleteOne({ _id: postId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting post' });
  }
})

const loadPostsCollection = async () => {
  try {
    const posts = await Post.find({});
    return posts;
  } catch (e) {
    console.error(e.message);

  }
}


module.exports = router;
