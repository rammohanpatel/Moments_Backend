import express from "express";
import {getPosts,createPosts,updatePost,deletePost} from "../controllers/posts.js"

const router = new express.Router();

router.get('/posts',getPosts);
router.post('/posts',createPosts);
router.patch('/posts/:id',updatePost);
router.delete('/posts/:id',deletePost);

router.get('/',(req,res)=>{
    res.send("Welcome to Mern-App");
})


export default router ;
