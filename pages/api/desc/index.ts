import { NextApiHandler } from "next";
import {connectToDatabase} from "../../../lib/mongodb";
import crypto from 'crypto'
import { PostType } from "../../../type";

const handler : NextApiHandler = async (req, res) => {
    const { db } = await connectToDatabase()

    if(req.method === "POST") {
        const { image, username, profile, desc, userId } = req.body
        const Post = db.collection<PostType>('Post')
        try {
            const Posts = await Post.insertOne({
                postId : crypto.randomUUID(),
                username,
                profile, 
                desc,
                image,
                userId,
                likes : []
            })
            
            return res.json({msg : "Post Uploaded.."})
        }catch(e) {
            return res.status(400).json({msg : e})
        }
    }
    
    if(req.method === "PATCH") {
        const likes = req.body as { postId : string, username : string, __type : "like" | "unlike" }
        const Query = req.query

        if(likes.__type === "like") {
            try {

                const Post = db.collection<PostType>('Post')
                
                const allLike = await Post.findOne({postId : Query.postId})
                
                const LikePost = await Post.updateOne({postId : Query.postId}, {$set : {likes : [...allLike!.likes, { postId : likes.postId, username : likes.username }]}}) 
                
                res.status(400).json({msg : "Liked.."})
            }catch(e) {
                return res.json({msg : e})
            }
        }

        if(likes.__type === "unlike") {
            try {
                const Post = db.collection<PostType>('Post')
                const allLike : Awaited<PostType | null> = await Post.findOne({postId : Query.postId})
                
                const unlike = allLike?.likes.filter((like) => like.username !== likes.username)
                
                const LikePost = await Post.updateOne({postId : Query.postId}, {$set : {likes : unlike}}) 
                
                res.json({msg : "UnLiked.."})
            }catch(e) {
                return res.status(400).json({msg : e})
            }
        }   
    }
}

export default handler