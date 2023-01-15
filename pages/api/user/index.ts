import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { FollowType, LoginType, PostType } from "../../../type";

export default async function handler (req : NextApiRequest, res : NextApiResponse) {
    if(req.method === "GET") {
            try {
                const {db} = await connectToDatabase()
                const { userId, whoFollowId } = req.query as {userId : string, whoFollowId : string}
                const User = db.collection<LoginType>("Login")
                const Post = db.collection<PostType>("Post")
                const Follow = db.collection<FollowType>("Follow")
                
                const find = await User.findOne({ userId : whoFollowId })
                const whoPost = await Post.findOne({userId : whoFollowId})
                const isFollow = await Follow.findOne({userId, whoFollowId})

                if(!find) return console.log("Cannot Find User..")

                if(whoPost) {
                    if(!isFollow) return res.json({msg : "unfollow", data : find})
                    return res.json({msg : "follow", data : find})
                }
            }catch(e) {
            }
    }
}
    
    