import { NextApiHandler } from "next";
import {connectToDatabase} from "../../../lib/mongodb";
import { FollowType, LoginType } from "../../../type";

const handler : NextApiHandler = async (req, res) => {
    if(req.method === "POST") {
        const { whoFollowId, userId } = req.body as { whoFollowId : string, userId : string }
        const { db } = await connectToDatabase()
        
        try {
            const Login = db.collection<LoginType>("Login")
            const Follow = db.collection<FollowType>("Follow")
            const find : Awaited<FollowType | null> = await Follow.findOne({userId, whoFollowId})
            
            const isExist : Awaited<LoginType | null> = await Login.findOne({ userId : whoFollowId })
            console.log(isExist)
            if(!isExist) return res.json({msg : "Cannot find the user you're try to follow.."})
            
            if(!find) {
                const Users : Awaited<LoginType | null> = await Login.findOne({userId})    
                
                await Follow.insertOne({username : Users?.username!, profile : Users?.profile!, userId, whoFollow : isExist.username, whoFollowId : isExist.userId, whoFollowProfile : isExist.profile})
                return res.json({msg : "follow"})
            }
            
            await Follow.deleteOne({ userId, whoFollowId })
            return res.json({msg : "unfollow"})
            
        }catch(e) {
        }
    }
}
    
export default handler