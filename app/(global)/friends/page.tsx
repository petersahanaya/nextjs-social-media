"use client";

import useSWR, { type Fetcher } from "swr";
import { useSession } from "next-auth/react";
import {BsSearch} from 'react-icons/bs'
import Images from "../../../components/Images";
import { type FollowType } from "../../../type.js";
import useSWRMutation from 'swr/mutation'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import FriendLoading from "./loading";

const getFriends: Fetcher<{ followed: FollowType[] }> = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const PageFriend = () => {
  const { data: session } : any = useSession();
  const url = `${process.env.PORT}/api/friend?userId=${session?.user?.id}`
  const { data: friends, isLoading, mutate } : any = useSWR(
    url
    ,
    getFriends
    );
    
  const { trigger } = useSWRMutation(url, getFriends)
  const [search, setSearch] = useState("")
  const [initData, setinitData] = useState<[] | FollowType>([])

    const handleFollow = async (userFollowId : string, userId : string) => {   
        const filtering = friends?.followed.filter((follow : FollowType) => follow.userId !== userId) 

        mutate({followed : filtering!}, {revalidate : false})

        const res = await fetch(`https://p3social.vercel.app/api/follow`, {
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

      const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if(!value) {
          return mutate({followed : initData}, {revalidate : false})
        }
        
        const filtering = friends?.followed.filter((friend : FollowType) => (
          friend.whoFollow.toLowerCase().includes(value.toLowerCase())
        ))

          mutate({followed : filtering!}, {revalidate : false})
        }

      useEffect(() => {
        if(!isLoading) return setinitData(friends?.followed!)
      }, [isLoading])

  if (isLoading) {
    return (
      <>
        <FriendLoading/>
      </>
    );
  }

  return (
    <main className="w-screen h-screen bg-slate-100 md:pl-16">
      <header className="w-screen h-[12vh] bg-white p-4">
        <h4 className="text-4xl text-stone-700 font-[500]">Friend's</h4>
        <span className="mt-2 relative">
          <input
            className="bg-white text-sm w-full md:w-[80vw] placeholder:text-stone-400 pl-8 text-black p-2 rounded-xl  outline-none"
            placeholder="Search for a person"
            onChange={handleSearch}
          />
          {!search &&
            <BsSearch color="rgb(65, 65, 65)" className="absolute top-[5px] left-[10px]"/>
          }
        </span>
      </header>
      <section className="mt-3 md:pl-4">
        
      {friends?.followed?.length ? <>
        {friends?.followed?.map((follow : FollowType, i : number) => (
                <section key={i} className="md:w-[85vw] w-full p-3 bg-white shadow-sm rounded-xl">
                    <header className=" flex items-center gap-2 justify-around">
                          <Link className="flex items-center gap-2" href={`/user/${follow.whoFollowId}`}>
                        <Images image={follow.whoFollowProfile} height={35} width={35}/>
                        <p className="text-sm text-stone-700">{follow.whoFollow}</p>
                          </Link>
                        <div>
                             <button 
                             onClick={() => handleFollow(follow.whoFollowId, follow.userId)} className="px-4 p-2 bg-white border-[1px] border-blue-500  rounded-full transition-[200ms] shadow-sm text-sm text-blue-500 hover:bg-stone-100">unfriend</button>
                        </div>
                    </header>
                </section>
        ))}
        </> : <p className="text-center text-stone-600 text-sm">There's no friend's</p>}
      </section>
    </main>
  );
};

export default PageFriend;
