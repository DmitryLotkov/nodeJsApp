import mongoose from "mongoose";
import {PostType} from "../types";


const Post = new mongoose.Schema({
    author: {type:String, required: true},
    title: {type:String, required: true},
    content: {type:String, required: true},
    picture:{type:String},
}, {
    timestamps: {
        createdAt: "created",
        updatedAt: "updated",
    }
})

export default mongoose.model<PostType>("Post", Post);