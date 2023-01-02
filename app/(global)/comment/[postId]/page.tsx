import { unstable_getServerSession } from "next-auth"
import Comments from "../../../../components/Comments"
import { authOption } from "../../../../pages/api/auth/[...nextauth]"
import { CommentType } from "../../../../type"
import Commentloading from "./loading"

const getComments = async (postId : string, url : string) : Promise<{comments : CommentType[]}> => {
    const res  = await fetch(`${url}?postId=${postId}`)
    return res.json()
}

const Comment = async ({params} : {params : { postId : string }}) => {   
    const session = await unstable_getServerSession(authOption)
    const data = await getComments(params.postId, "http://localhost:3000/api/comment")

    return (
      <Commentloading/>
    )
  return (
    <main className="bg-slate-100 w-screen h-screen">
        <Comments comments={data.comments} session={session} postId={params.postId}/>
    </main>
  )
}

export default Comment