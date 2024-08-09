const app = require("express");
const mongoose = require("mongoose");
const { Types } = mongoose;
const router = app.Router();
const PostMessage = require("../models/postmessage.js");



export  const getPosts = async (req,res)=>{
    try {
        const PostMessages = await PostMessage.find();

        res.status(200).json(PostMessages);
    } catch (error) {
        res.status(404).json({message:error.message});
        
    }
}

export const getPost = async(req,res)=>{
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
        
    } catch (error) {
        res.status(404).json({message:error.message});
        
    }
}

export const createPost = async(req,res)=>{
    const { title,message,selectedFile,creator,tags}= req.body;

    const newPostMessage = new PostMessage({title,message,selectedFile,creator,tags})

    try {
         await newPostMessage.save();

         res.status(201).json(newPostMessage);
        
    } catch (error) {
        res.status(409).json({message:error.message})
        
    }
}

export const updatePost= async(req,res)=>{
    const {id }= req.params;
    const {title,message,selectedFile,creator,tags}= req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`post not founded with ${id}`);
    
    const updatePost ={creator,title,message,tags,selectedFile ,_id:id};

    await PostMessage.findByIdAndUpadate(id,updatePost,{neww:true});

    res.json(updatePost);           

}

export const deletePost = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`${id} not found`);

    await PostMessage.findByIdAndRemove(id);

    res.json({message:"Post has beend deleted"});

}

export const likePost= async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send(`${id} not found`);

    const post = await PostMessage.findById(id);

    const updatePost = await PostMessage.findByIdAndUpadate(id,{likeCount: post.likeCount +1},{new:true});

    res.json(updatePost)
}

module.exports = router;

