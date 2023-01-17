import { NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../lib/mongodb";
import { PostType } from "../../../type";

/*export const config = {
    api : {
        bodyParser : false
    }
}*/


const handler = nc({
  onError(err, _, res: NextApiResponse) {
    res.status(400).json({ msg: "Something Went Wrong.." });
  },
})

handler.get(async (_, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const Post = db.collection<PostType>("Post");
  const Posts = await Post.find({}, { projection: { _id: 0 } }).toArray();
  res.json({ post: Posts });
});

export default handler;
