import Post from "./Post";
import fileService from "./PostFileService";
import {UploadedFile} from "express-fileupload";
import {DataWithPaginationType, PostType} from "../types";


class PostService {
    async create(post: PostType, picture:UploadedFile):Promise<PostType> {
        const fileName = fileService.saveFile(picture)
        return await Post.create({...post, picture: fileName})
    }
    async getAll(page: number, postsPerPage:number): Promise<DataWithPaginationType<PostType>> {

        const postTotalCount = await Post.countDocuments()
        const items = await Post.find()
            .skip(postsPerPage * (page - 1))
            .limit(postsPerPage)
        return {
            items,
            page,
            postsPerPage,
            postTotalCount,
        }
    }

    async getOne(id: string):Promise<PostType | null> {
        if (!id) {
            throw new Error("Не указан ID")
        }
        return Post.findById(id)
    }

    async update(post: PostType):Promise<PostType | null> {
        if (!post._id) {
            throw  new Error("Не указан ID")
        }
        return Post.findByIdAndUpdate(post._id, post, {new: true})
    }

    async delete(id: string):Promise<PostType | null> {
        if (!id) {
            throw  new Error("Не указан ID")
        }
        return Post.findByIdAndDelete(id)
    }
}

export default new PostService()

