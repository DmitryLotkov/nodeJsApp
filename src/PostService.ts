import Post from "./Post";

type PostType = {
    author: string,
    title: string,
    content: string,
    picture: string
    _id: string
}

class PostService {
    create(post: PostType) {
        return Post.create(post)
    }

    getAll() {
        return Post.find()
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