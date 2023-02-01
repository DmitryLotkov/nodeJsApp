import {Router} from "express";
import PostController from "../main/posts/PostController";

export const postRouter = Router({});
postRouter.post("/", PostController.create);
postRouter.get("/", PostController.getAll);
postRouter.get("/:id", PostController.getOne);
postRouter.put("/:id", PostController.update);
postRouter.delete("/:id", PostController.delete);

export default postRouter;