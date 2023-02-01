import Post from "./Post";
import fileService from "./PostFileService";
import {UploadedFile} from "express-fileupload";
import mongoose from "mongoose";

export type PostType = {
    author: string;
    title: string;
    content: string;
    picture: string;
    _id: mongoose.Types.ObjectId
    created: Date
    updated: Date;
    postCount:number;

}

class PostService {
    async create(post: PostType, picture:UploadedFile) {
        const fileName = fileService.saveFile(picture)
        return await Post.create({...post, picture: fileName})
    }

    getAll(page: number, PostsPerPage:number) {
        return Post.find()
            .skip(PostsPerPage * (page - 1))
            .limit(PostsPerPage)
    }

    getOne(id: string) {
        if (!id) {
            throw new Error("Не указан ID")
        }
        return Post.findById(id)
    }

    update(post: PostType) {
        if (!post._id) {
            throw  new Error("Не указан ID")
        }
        return Post.findByIdAndUpdate(post._id, post, {new: true})
    }

    delete(id: string) {
        if (!id) {
            throw  new Error("Не указан ID")
        }
        return Post.findByIdAndDelete(id)
    }
}

export default new PostService()

