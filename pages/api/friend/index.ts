import { NextApiHandler } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { FollowType } from "../../../type";

const handler : NextApiHandler = async (req, res) => {
    if(req.method === "GET") {  
      const {db} =  await connectToDatabase()
        const { userId } = req.query
        const User = db.collection<FollowType>("Follow")

        if(userId)  {
          const followed = await User.find({userId}, {projection : { _id : 0 }}).toArray();
          return res.json({followed})
        }

        return res.json({followed : []});
    }
}

export default handler