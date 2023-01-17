'use client'
import { LoginType } from "../../../../../type"
import useSWR, { Fetcher } from 'swr'
import useMutation from 'swr/mutation'
import { useSession } from "next-auth/react"
import LoadingUser from "../Loading"
import Images from "../../../../../components/Images"
import { GiThreeFriends } from "react-icons/gi"
import UserPost from "../../../../../components/profile/UserPost"
import { useState } from "react"
import ListFriend from "../../../../../components/friends/ListFriend"

const fetcher: Fetcher<{ msg: "cannot found" | "follow" | "unfollow", data: LoginType} > = async (url: string) => {
  const res = await fetch(url)
  return await res.json()
}

const User = ({ params }: { params: { id: string } }) => {
  const { data: session }  = useSession()
  const { data : follows, isLoading, mutate } = useSWR(`${process.env.PORT}/api/user?whoFollowId=${params.id}&&userId=${session?.user?.id}`, fetcher)
  const { trigger } = useMutation(`https://p3social.vercel.app/api/user?whoFollowId=${params.id}&&userId=${session?.user?.id}`, fetcher)
  const [isFriend, setIsFriend] = useState(false)

  const handleFollow = async (userFollowId : string, userId : string) => {    
    mutate({data : follows!, msg : `${follows?.msg === "follow" ? "unfollow" : "follow"}`})
    const res = await fetch("https://p3social.vercel.app/api/follow", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({whoFollowId : userFollowId, userId})
    })
    
    if(res.ok) {
      trigger()
    }
    
    const data : Awaited<{msg : "follow" | "unfollow"}> = await res.json()
  }
  
  if (isLoading) {
    return <>
      <LoadingUser />
    </>
  }
  
  return (
    <main className="bg-slate-100 w-screen h-screen relative">
      <header className="w-screen flex flex-col justify-center items-center bg-white shadow-sm p-3">
        <article className="flex justify-around items-center w-screen p-2">
          <div className="flex items-center gap-2">
            <Images image={follows?.data?.profile!} width={80} height={80} />
            <p className="text-stone-700 font-[500]">{follows?.data?.username}</p>
          </div>
          <nav>
            <section className="flex flex-col justify-center items-center">
              <p className="text-stone-700 font-[500]">{0}</p>
              <h4 className="font-[400] text-stone-500 text-sm">Friend's</h4>
            </section>
          </nav>
        </article>
        <section className="w-[80vw] flex justify-end items-center mb-4">
          <button onClick={() => handleFollow(params.id, session?.user?.id)} className={`text-stone-100 text-sm ${follows?.msg !== "follow" ? "bg-blue-500 text-stone-100 hover:bg-blue-600" : "bg-white text-blue-600 border-[1px] border-blue-500 hover:bg-stone-100"} px-8 rounded-full p-3 transition-[200ms] `}>{follows?.msg === "follow" ? "Unfollow" : "Follow"}</button>
        </section>
      <section className="w-screen flex justify-center items-center p-2 mt-2">
        <div className={`w-[8rem] rounded-bl-full rounded-tl-full p-2 cursor-pointer transition-[200ms] ${!isFriend ? "bg-stone-800 text-stone-100" : "bg-slate-200 text-stone-800 hover:bg-slate-500 hover:text-white"}`} onClick={() => setIsFriend(false)}>
          <h3 className="text-center mt-2 text-sm">Post's</h3>
        </div>
        <div className={`w-[8rem] rounded-br-full rounded-tr-full p-3 cursor-pointer flex justify-center items-center transition-[200ms] ${isFriend ? "bg-stone-800 text-stone-100" : "hover:bg-slate-500 hover:text-white text-stone-800 bg-slate-200"}`} onClick={() => setIsFriend(true)}>
          <GiThreeFriends size={20} />
        </div>
      </section>
      </header>
      {isFriend && <>
        <ListFriend params={params}/>
      </>}
      {/* @ts-ignore */}
      {!isFriend &&
        <UserPost userId={params.id}/>
      }
    </main>
  )
}

export default User