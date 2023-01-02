import { NextApiHandler } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { CommentType } from "../../../type";

const handler : NextApiHandler = async (req, res) => {
    const { db } = await connectToDatabase()

    if(req.method === "GET") {
        const query = req.query as { postId : string }
        const Comment = db.collection<CommentType>("Comment")

        try {
            const comments = await Comment.find({postId : query.postId}, {projection : { _id : 0 }}).toArray()
            console.log(comments)
            res.json({comments})
        }catch(e) {
            console.log(e)
        }
    }

    if(req.method === "POST") {
        const query = req.query as { postId : string }
        const { postId, username, profile, desc } = req.body as CommentType

        const Comment = db.collection<CommentType>("Comment")

        try {
            const addComment = await Comment.insertOne({postId, username, profile, desc, date : new Date(Date.now()).toUTCString().slice(0, 17)})

            res.json({msg : "Comment Added.."})            
        }catch(e) {
            console.log(e)
        }
    }
}

export default handler