import Posts from "../../components/Post"
import PostLayout from "../../components/PostLayout"
import { PostType } from "../../type"

const getPost = async () => {
  const res = await fetch("http://localhost:3000/api/post")
    return res.json()
}

const Post = async () => {
  const posts : Awaited<{post : PostType[]}> = await getPost()
  return (
    <main className="w-screen bg-slate-100 pb-48">
      <PostLayout post={posts.post} >
        <Posts/>
      </PostLayout>
    </main>
  )
}

export default Post