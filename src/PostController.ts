import {Request, Response} from "express";
import PostService from "./PostService";

class PostController {
    async create(req: Request, res: Response) {
        try {
            const post = await PostService.create(req.body)
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
            const post = await PostService.getOne(req.params.id)
            return res.json(post)
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