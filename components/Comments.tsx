"use client"
import { Session } from "next-auth"
import { BiPaperPlane, BiWorld } from "react-icons/bi"
import { CommentType } from "../type"
import Images from "./Images"
import { TbHourglassEmpty } from 'react-icons/tb'
import React, { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import BoxComment from "./BoxComment"

const Comments: React.FC<{ comments: CommentType[], session: Session | null, postId: string }> = ({ comments, session, postId }) => {
  const [desc, setDesc] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleComment = (e: ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value)
  }

  const handleSend = async () => {
    if (!desc) return alert("Cannot Send Comment without Description..")

    setIsAdding(true)
    const res = await fetch("https://p3social.vercel.app/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ postId, username: session?.user?.name, profile: session?.user?.image, desc })
    })

    if (res.ok) {
      setIsAdding(false)
      setSuccess("Comment Added..")
      setTimeout(() => {
        setSuccess("")
      }, 2000)
      router.refresh()
    }

    const data = await res.json()
  }

  return (
    <nav>
      <header className="w-screen h-[17h] bg-white flex items-center flex-col gap-2 justify-center">
        <nav className="w-full flex items-center h-full gap-2 justify-around p-3">
          <article className="flex justify-around items-center gap-2">
            <section>
              <Images image={session?.user?.image!} />
            </section>
            <div>
              <p className="font-[500] text-stone-800">{session?.user?.name}</p>
              <span className="flex gap-2 items-center">
                <BiWorld color="rgb(60, 60, 60)" />
                <p className="text-stone-600 text-sm">Public</p>
              </span>
            </div>
          </article>
          <BiPaperPlane onClick={handleSend} size={45} className="bg-blue-500 text-stone-100 w-[8rem] rounded-xl p-2 shadow-sm cursor-pointer transition-[200ms] hover:bg-blue-600" />
        </nav>
        <input onChange={handleComment} className="w-screen bg-white outline-none text-[.9rem] p-3 mb-8 md:w-[80vw]" type="text" placeholder="What You Want To Talk?" />
      </header>
      {comments?.length ?
        <>
          <main className="md:pl-16 md:mt-3">
            {comments.map((comment, i) => (
              <React.Fragment key={i}>
                <BoxComment comment={comment} />
              </React.Fragment>
            ))
            }
          </main>
        </>
        : <div className="mt-3 flex flex-col justify-center items-center gap-2">
          <TbHourglassEmpty size={30} color="rgb(45, 45, 45)" />
          <p className="text-center text-stone-700 text-sm mt-12">There is no comment yet..</p></div>}
      {success && <p className="bg-stone-800 text-stone-100 w-[80vw] rounded-xl fixed top-[10px] right-[10%] text-center  text-sm p-2">{success}</p>}
      {isAdding && <p className="bg-stone-800 text-stone-100 w-[80vw] rounded-xl fixed top-[10px] right-[10%] text-center  text-sm p-2">Adding comment..</p>}
    </nav>
  )
}

export default Comments