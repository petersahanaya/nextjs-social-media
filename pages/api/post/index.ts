import { NextApiResponse } from "next";
import nc from 'next-connect'
import { connectToDatabase } from "../../../lib/mongodb";
import multer from 'multer'
import crypto from 'crypto'
import { PostType } from "../../../type";

export const config = {
    api : {
        bodyParser : false
    }
}

let fileName = ""

const upload = multer({
    storage : multer.diskStorage({
        destination : "./public",
        filename : (_, file, cb) => {
            fileName = `${crypto.randomUUID()}-${file.originalname}`
            cb(null, fileName)
        }
    })
})

const handler = nc({
    onError(err, _, res : NextApiResponse) {
        res.status(400).json({msg : "Something Went Wrong.."})
    }
})

.use(upload.single('file'))

handler.get(async(_, res : NextApiResponse) => {
    try {
        const { db } = await connectToDatabase()
        const Post = db.collection<PostType>("Post")
        const Posts = await Post.find({}, {projection : {_id : 0}}).toArray()   
        res.json({post : Posts})
    }catch(e) {
    }
})

handler.post(async (_, res : NextApiResponse) => {
    res.json({msg : fileName})
})

export default handler