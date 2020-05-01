const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require("../../middleware/auth");


const User = require("../../models/User");
const Post = require("../../models/Post");


//@route POST api/posts
//@desc Create a post
//@access Private
router.post("/", [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        const post = await newPost.save();
        await res.json(post);

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error")
    }

})


//@route GET api/posts
//@desc Get all posts
//@access Private
router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});
        res.json(posts);
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error")
    }
})


//@route GET api/posts/:id
//@desc Get post by ID
//@access Private
router.get("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }
        await res.json(post);
    } catch (e) {
        console.log(e.message);
        if (e.kind === 'ObjectID') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send("Server Error")
    }
})


//@route DELETE api/posts/:id
//@desc Delete a post
//@access Private
router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }
        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'})
        }
        await post.remove();

        await res.json({
            msg: "Post removed"
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error")
    }
})


//@route PUT api/posts/likes/:id
//@desc Like a post
//@access Private

router.put('/likes/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg: 'Post already liked'})
        }
        post.likes.unshift({user: req.user.id});
        await post.save();
        await res.json(post.likes)
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error")
    }
})


//@route PUT api/posts/unlikes/:id
//@desc Unlike a post
//@access Private

router.put('/unlikes/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg: 'Post has not yet been liked'})
        }
        // Get remove unlike index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        await res.json(post.likes)
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error")
    }
})


//@route POST api/posts/comments/:id
//@desc Comment on a post
//@access Private
router.post("/comments/:id", [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        post.comments.unshift(newComment);
        await post.save();
        await res.json(post.comments);

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error")
    }

})


//@route POST api/posts/comments/:id/:comments_id
//@desc Delete comment on a post
//@access Private
router.delete("/comments/:id/:comments_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Pull out comment
        const comment = await post.comments.find(comment => comment.id === req.params.comments_id);
        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({msg: "Comment does not exists"})
        }
        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "User not authorized"})
        }

        // Get remove comment index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();
        await res.json(post.comments)

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router;