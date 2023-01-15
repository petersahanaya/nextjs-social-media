'use client'

import { Session } from "next-auth"
import Images from "../../../../components/Images"
import UserPost from "../../../../components/profile/UserPost"
import Switch from "../../../../components/Switch"
import { GiThreeFriends } from 'react-icons/gi'
import useSWR, { Fetcher } from 'swr'
import { useSession } from "next-auth/react"
import { FollowType } from "../../../../type"
import ProfileLoading from "./loading"
import { useState } from "react"
import ListFriend from "../../../../components/friends/ListFriend"

export interface profileSession extends Session {
  user : {
    name : string,
    image : string,
    email : string,
    id : string
  }
}

const getFriends : Fetcher<{followed : FollowType[]}> = async (url : string) => {
  const res = await fetch(url);
  return res.json() 
}

const Profile = () => {
  const { data : session } = useSession();
  const { data, isLoading } = useSWR(`http://localhost:3000/api/friend?userId=${session?.user?.id}`, getFriends)
  const [isFriend, setIsFriend] = useState(false);

  if(isLoading) {
    return <>
      <ProfileLoading/>
    </> 
  }
    return (
       <main className="bg-slate-100 w-screen h-screen relative">
      <header className="w-screen flex flex-col justify-center items-center bg-white shadow-sm p-3">
        <article className="flex justify-around items-center w-screen p-2">
        <div className="flex items-center gap-2">
          <Images image={session?.user?.image!} width={80} height={80} />
          <p className="text-stone-700 font-[500]">{session?.user?.name}</p>
        </div>
      <nav>
        <section className="flex flex-col justify-center items-center">
          <p className="text-stone-700 font-[500]">{data?.followed?.length}</p>
          <h4 className="font-[400] text-stone-500 text-sm">Friend's</h4>
        </section>
      </nav>
        </article>
      <section className="w-screen flex justify-center items-center p-2 mt-2">
        <div className={`w-[8rem] rounded-bl-full rounded-tl-full p-2 cursor-pointer transition-[200ms] ${!isFriend ? "bg-stone-800 text-stone-100" : "bg-slate-200 text-stone-800 hover:bg-slate-500 hover:text-white"}`} onClick={() => setIsFriend(false)}>
          <h3 className="text-center mt-2 text-sm">Post's</h3>
        </div>
        <div className={`w-[8rem] rounded-br-full rounded-tr-full p-3 cursor-pointer flex justify-center items-center  transition-[200ms] ${isFriend ? "bg-stone-800 text-stone-100" : "hover:bg-slate-500 hover:text-white text-stone-800 bg-slate-200"}`} onClick={() => setIsFriend(true)}>
          <GiThreeFriends size={20} />
        </div>
      </section>
      </header>
      {isFriend && session && <>
        <ListFriend session={session}/>
      </>}
      {!isFriend && <>
      {/* @ts-ignore */}
        {session && <UserPost session={session}  />}
        <Switch/>
      </>
      }
    </main>
  )
}

export default Profile