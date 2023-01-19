import { unstable_getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Comments from "../../../../components/Comments"
import { authOption } from "../../../../pages/api/auth/[...nextauth]"
import { CommentType } from "../../../../type"

const getComments = async (postId : string, url : string) : Promise<{comments : CommentType[]}> => {
    const res  = await fetch(`${url}?postId=${postId}`, {
      cache : "no-store"
    })

    if(!res.ok) {
      const data = await res.json()
      throw new Error(data?.msg || "Something is Wrong in comment")
    }

    return res.json()
}

const Comment = async ({params} : {params : { postId : string }}) => {   
    const session = await unstable_getServerSession(authOption)
    if(!session?.user) {
      return redirect("/")
    }
    const data = await getComments(params.postId, `https://p3social.vercel.app/api/comment`)
  return (
    <main className="bg-slate-100 w-screen h-screen">
        <Comments comments={data.comments} session={session} postId={params.postId}/>
    </main>
  )
}

export default Comment