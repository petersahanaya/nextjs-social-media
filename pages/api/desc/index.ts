import { NextApiHandler } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import crypto from 'crypto'
import { Collection } from "mongodb";
import { PostType } from "../../../type";

const handler : NextApiHandler = async (req, res) => {
    const { db } = await connectToDatabase()
    if(req.method === "POST") {
        const { image, username, profile, desc } = req.body
        
        try {
            const Post = await db.collection("Post").insertOne({
                postId : crypto.randomUUID(),
                username,
                profile, 
                desc,
                image,
                likes : []
            })
            
            return res.json({msg : "Post Uploaded.."})
        }catch(e) {
            console.log(e)
        }
    }
    
    if(req.method === "PATCH") {
        const likes = req.body as { postId : string, username : string, __type : "like" | "unlike" }
        const Query = req.query

        if(likes.__type === "like") {
            const PostCollection : Collection<PostType> = db.collection("Post")
            
            const allLike = await PostCollection.findOne({postId : Query.postId})
            
            const LikePost = await PostCollection.updateOne({postId : Query.postId}, {$set : {likes : [...allLike!.likes, { postId : likes.postId, username : likes.username }]}}) 
            
            res.json({msg : "Liked.."})
        }

        if(likes.__type === "unlike") {
            const PostCollection : Collection<PostType> = db.collection("Post")
            
            const allLike = await PostCollection.findOne({postId : Query.postId})

            const unlike = allLike?.likes.filter((like) => like.username !== likes.username)
            
            const LikePost = await PostCollection.updateOne({postId : Query.postId}, {$set : {likes : unlike}}) 
            
            res.json({msg : "UnLiked.."})
        }   
    }
}

export default handler