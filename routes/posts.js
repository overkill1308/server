const express = require('express');
const Post = require('../models/Post');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({message: err});
    }
})

router.post('/adduser', upload.single("avatar"), async (req, res) => {

    try{
        const result = await cloudinary.uploader.upload(req.file.path);

        const post = new Post({
            username: req.body.username,
            password: req.body.password,
            fullName: req.body.fullName,
            birthDate: req.body.birthDate,
            avatar: result.secure_url,
            cloudinary_id: result.public_id 
        });

        const savePost = await post.save();
        res.json(savePost);
    } catch(err){
        res.json({message: err});
    }
})

router.get('/getuser/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (error) {
        res.json({message: err});
    }
})

router.delete('/deleteuser/:postId', async (req, res) => {
    try {
        let user = await Post.findById(req.params.postId);
        await cloudinary.uploader.destroy(user.cloudinary_id);
        await user.remove();
        res.json(user);
    } catch (error) {
        res.json({message: err});
    }
})

router.put('/:postId', upload.single("avatar"), async (req, res) => {
    try {
        let user = await Post.findById(req.params.postId);
        await cloudinary.uploader.destroy(user.cloudinary_id);
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            username: req.body.username || user.username,
            password: req.body.password || user.password,
            fullName: req.body.fullName || user.fullName,
            birthDate: req.body.birthDate || user.birthDate,
            avatar: result.secure_url || user.avatar,
            cloudinary_id: result.public_id || user.cloudinary_id 
        };
        user = await Post.findByIdAndUpdate(req.params.postId, data, {new: true});
        res.json(user);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;