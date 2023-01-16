import { NextApiHandler } from "next";
import {connectToDatabase} from "../../../lib/mongodb";
import { CommentType } from "../../../type";
import crypto from 'crypto'

const handler : NextApiHandler = async (req, res) => {
    const { db } = await connectToDatabase()

    if(req.method === "GET") {
        const query = req.query as { postId : string }
        const Comment = db.collection<CommentType>('Comment')

        try {
            const comments = await Comment.find({postId : query.postId}, {projection : {_id : 0}}).toArray()
            res.json({comments})
        }catch(e) {
            return res.status(400).json({msg : e})
        }
    }

    if(req.method === "POST") {
        const query = req.query as { postId : string }
        const { postId, username, profile, desc } = req.body as CommentType
        const Comment = db.collection<CommentType>('Comment')
        
        try {
            const addComment = await Comment.insertOne({postId, username, profile, desc, date : new Date(Date.now()).toUTCString().slice(0, 17), commentId : crypto.randomUUID()})

            res.json({msg : "Comment Added.."})            
        }catch(e) {
            return res.status(400).json({msg : e})
        }
    }

    if(req.method === "DELETE") {
        const { commentId } = req.query as {commentId : string}

        try {
            const Comment = db.collection<CommentType>('Comment')
            const deleteOne = await Comment.deleteOne({commentId})
            res.json({msg : "Comment Deleted.."})
        }catch(e) {
            return res.status(400).json({msg : e})
        }
    }
}

export default handler