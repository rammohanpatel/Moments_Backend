import mongoose from "mongoose";
import express from "express";
import postMessage from "../models/Schema.js"


const router = express.Router();

export const getPosts =  async(req,res)=>{
    try {
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
    
}

export const createPosts = async(req,res)=>{

    try {
        const post = req.body;
        const newPost = new postMessage(post);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message })
    }
}
export const updatePost = async(req,res)=>{
    try {
        const {id} = req.params;
        const { title, message, creator, selectedFile, tags } = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Object Id not found');
        const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
        await postMessage.findByIdAndUpdate(id,updatedPost,{new:true});
        res.json(updatedPost);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deletePost = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Object Id not found');
        await postMessage.findByIdAndRemove(id);
        res.json('Post Deleted Successfully');

    } catch (error) {
        console.log(error);
    }
}

