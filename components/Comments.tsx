"use client"
import { Session } from "next-auth"
import { BiPaperPlane, BiWorld } from "react-icons/bi"
import { CommentType } from "../type"
import Images from "./Images"
import {TbHourglassEmpty} from 'react-icons/tb'
import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import BoxComment from "./BoxComment"

const Comments : React.FC<{comments : CommentType[], session : Session | null, postId : string}> = ({comments, session, postId}) => {
  const [desc, setDesc] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleComment = (e : ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value)
  }

  const handleSend = async () => {
    if(!desc) return alert("Cannot Send Comment without Description..")

    const res = await fetch("/api/comment", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({postId, username : session?.user?.name, profile : session?.user?.image, desc})
    })

    if(res.ok) {
      setSuccess("Comment Added..")
      router.refresh()
    }

    const data = await res.json()
  }

  return (
    <nav>
    <header className="w-screen h-[11vh] bg-white flex items-center gap-2 justify-around">
        <article className="flex justify-around items-center gap-2">
            <section>
                <Images image={session?.user?.image!}/>
            </section>
            <div>
                <p className="font-[500] text-stone-800">{session?.user?.name}</p>
                <span className="flex gap-2 items-center">
                    <BiWorld color="rgb(60, 60, 60)"/>
                    <p className="text-stone-600 text-sm">Public</p>
                </span>
            </div>
        </article>
          <BiPaperPlane onClick={handleSend} size={45} className="bg-blue-500 text-stone-100 w-[8rem] rounded-xl p-2 shadow-sm cursor-pointer transition-[200ms] hover:bg-blue-600"/>
      </header>
        <input onChange={handleComment} className="w-screen bg-white outline-none text-[.9rem] p-3 mb-8" type="text" placeholder="What You Want To Talk?"/>
        {comments?.length ? 
          <>
        {comments.map((comment, i) => (
              <main key={i}>
                <BoxComment comment={comment}/>
              </main>
            ))
        }
        </>
           : <div className="mt-3 flex flex-col justify-center items-center gap-2">
          <TbHourglassEmpty size={30} color="rgb(45, 45, 45)"/>
          <p className="text-center text-stone-700 text-sm mt-12">There's no comment yet..</p></div>}
        {success && <p className="bg-stone-800 text-stone-100 w-[80vw] rounded-xl fixed top-[10px] right-[10%] text-center  text-sm p-2">{success}</p>}
    </nav>
  )
}

export default Comments