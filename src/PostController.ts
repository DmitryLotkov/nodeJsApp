import {Request, Response} from "express";
import Post from "./Post";

class PostController {
    async create(req: Request, res: Response) {
        try {
            const {author, title, content, picture} = req.body
            const post = await Post.create({author, title, content, picture})
            res.status(201).json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const posts = await Post.find(); //вернет все посты, так как не указали параметры в find
            return res.json(posts)
        } catch(e){
            res.status(500).json(e)
        }

    }

    async getOne(req: Request, res: Response) {
        try{
            const {id} = req.params
            if(!id){
                res.status(400).json({message: "Id не указан"})
            }
            const post  = await Post.findById(id)
            return res.json(post)
        } catch(e){
            res.status(500).json(e)
        }
    }

    async update(req: Request, res: Response) {
        try{
        const post = req.body
            if(!post._id){
                res.status(400).json({message: "Id не указан"})
            }
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
            return res.json(updatedPost)
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async delete(req: Request, res: Response) {
        try{
            const {id} = req.params
            if(!id){
                res.status(400).json({message: "Id не указан"})
            }
            const post = await Post.findByIdAndDelete(id)
            return res.json(post)
        }
        catch(e){
            res.status(500).json(e)
        }
    }
}

export default new PostController()