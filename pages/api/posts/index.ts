import { NextApiHandler } from "next"
import { connectToDatabase } from "../../../lib/mongodb"
import { PostType } from "../../../type"

const handler : NextApiHandler = async (req, res) => {
    if(req.method === "GET") {
        const { userId } = req.query as {userId : string}
        try {
            const { db } = await connectToDatabase()

            const Post = db.collection<PostType>("Post")

            const found = await Post.find({userId}, {projection : {_id : 0}}).toArray()
            console.log({found})

            if(!found || !found.length) return res.json({msg : "User not have post.."})

            res.json({data : found})
        }catch(e) {
        }
    }
}

export default handler 