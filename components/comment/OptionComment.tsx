'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

const OptionComment = ({commentId} : {commentId : string}) => {
    const [isActive, setIsActive] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleted, setIsDeleted] = useState("")
    const router = useRouter()
    
    
    const handleDelete = async (id : string) => {
        setIsLoading(true)
        const res = await fetch(`${process.env.PORT}api/comment?commentId=${id}`, {
            method : "DELETE"
        })    
        const data = await res.json()

        if(res.ok) {
            setIsLoading(false)
            setIsDeleted("Comment Deleted..")
            router.refresh()
            setTimeout(() => {
                setIsDeleted("")
            }, 2000)
        }
    }

  return (
    <div className="absolute top-[8px] right-[20px]">
        <span className="relative">
            <p onClick={() => setIsActive(!isActive)} className="font-bold cursor-pointer">. . .</p>
            {isActive &&
                <section onClick={() => handleDelete(commentId)} className="bg-stone-100 absolute bottom-[-40px] left-[-40px] p-2 transition-[200ms] rounded-lg shadow-sm hover:bg-stone-200 cursor-pointer">
                <p className="text-red-600 text-sm">Delete</p>
            </section>
            }
        </span>
        {isDeleted && <p className="bg-stone-800 text-stone-100 w-[80vw] rounded-xl fixed top-[10px] right-[10%] text-center  text-sm p-2">{isDeleted}</p>}
        {isLoading && <p className="bg-stone-800 text-stone-100 w-[80vw] rounded-xl fixed top-[10px] right-[10%] text-center  text-sm p-2">Removing Comment..</p>}
    </div>
  )
}

export default OptionComment