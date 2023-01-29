import {Request, Response} from "express";
import PostService from "./PostService";
import {UploadedFile} from "express-fileupload";
import mongoose from "mongoose";

class PostController {
    async create(req: Request, res: Response) {
        try {
            const post = await PostService.create(req.body, req.files?.picture as UploadedFile)
            res.status(201).json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getAll(req: Request, res: Response) {
        try {
            const posts = await PostService.getAll(); //вернет все посты, так как не указали параметры в find
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req: Request, res: Response) {
        try {
            const _id = req.params.id;
            const isValidId = mongoose.Types.ObjectId.isValid(_id)
            if (!isValidId) {
                return res.status(400).send("ID does not exist")
            } else{
                const post = await PostService.getOne(_id)
                return res.json(post)
            }
        } catch (e:any) {
            res.status(500).json(e.message)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedPost = await PostService.update(req.body)
            return res.json(updatedPost)
        } catch (e:any) {
            res.status(500).json(e.message)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const post = await PostService.delete(req.params.id)
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

}

export default new PostController()