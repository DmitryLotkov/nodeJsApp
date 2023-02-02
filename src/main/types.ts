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

export type DataWithPaginationType<T>={
    page: number,
    postsPerPage: number,
    postTotalCount: number,
    items: T[]//тип
}