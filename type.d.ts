import { ObjectId } from "mongodb"

type UserType = {
    id? : ObjectId,
    userId : string,
    username : string,
    profile : string,
}

type FollowType = {
    id? : ObjectId,
    userId : string,
    username : string,
    profile : string,
    whoFollow : string,
    whoFollowId : string,
    whoFollowProfile : string
}

type LoginType = {
    id? : ObjectId,
    userId : string,
    username : string,
    profile : string,
    followed : Array<UserType>
}

type PostType = {
    id? : ObjectId,
    postId : string
    username : string,
    profile : string,
    image : string,
    desc : string,
    userId : string,
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
    date : date,
    commentId : string
}

type LikesType = {
    id : ObjectId,
    likes : Array<{ username : string, userId : string, postId :  string, profile : string}>
}