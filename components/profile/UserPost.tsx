import { Session } from "next-auth"
import Image from "next/image"
import { connectToDatabase } from "../../lib/mongodb"
import { PostType } from "../../type"

const getPost = async (username : string) => {
    const { db } = await connectToDatabase()

    const Post = db.collection<PostType[]>("Post")

    return await Post.find({ username }, {projection : { _id : 0 }}).toArray()
}

const UserPost = async ({session} : { session : Session }) => {
    const posts = await getPost(session.user?.name!)

  if(!posts.length) return (
    <></>
  )

  return (
    <nav className="flex items-center mt-2 p-2">
     {posts.map((post, i) => (
        <section key={i} className="w-[200px] h-[13rem] shadow-sm transition-[200ms] cursor-pointer hover:scale-105">
            <Image src={`/${post.image}`} width={200} height={140} alt="post" className="w-full h-full object-cover rounded-xl"/>
        </section>
     ))}   
    </nav>
  )
}

export default UserPost