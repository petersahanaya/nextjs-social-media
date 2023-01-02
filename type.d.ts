import { ObjectId } from "mongodb"

type PostType = {
    id : ObjectId,
    postId : string
    username : string,
    profile : string,
    image : string,
    desc : string,
    likes : Array<LikesType>
}

type LikesType = {
    id? : ObjectId,
    userId? : string,
    postId : string,
    username : string
}

type CommentType = {
    id? : ObjectId,
    postId : string,
    username : string,
    profile : string,
    desc : string,
    date : date
}

type LikesType = {
    id : ObjectId,
    likes : Array<{ username : string, userId : string, postId :  string, profile : string}>
}