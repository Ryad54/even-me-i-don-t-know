const app = require('express');

const { getPosts, getPost, createPost, updatePost, likePost, deletePost } = 
require('../controller/post.js');
const router= app.Router();


router.get('/',getPosts);
router.post('/',getPosts);
router.get('/:id',getPosts);
router.patch('/:id',getPosts);
router.delete('/:id',getPosts);
router.patch('/:id/likePost',getPosts);



module.exports = router;
