'use client';

import useSWR, { Fetcher } from 'swr'
import Image from "next/image"
import { PostType, profileSession } from "../../type"

const fetcher : Fetcher<{ data? : PostType[], msg? : string }> = async (url : string) => {
    const res = await fetch(url)
    return res.json() 
}

const UserPost = ({session, userId} : { session? : profileSession, userId? : string }) => {
    const {data : posts, isLoading} = useSWR(`${process.env.PORT}/api/posts?userId=${session?.user?.id! ? session?.user?.id :  userId}`, fetcher)
    const LoadArr = [1, 2, 3, 4]

  if(isLoading) return (
    <>
      <article className="w-screen flex justify-center items-center gap-3 flex-wrap mt-3">
          {LoadArr.map((_, i) => (
            <nav key={i} className="w-[220px] h-[200px] rounded-xl bg-stone-600 animate-pulse"></nav>
          ))}
      </article>
    </>
  )

  if(!posts?.data?.length) return (
    <>
    <p className="text-center mt-4 text-sm text-stone-600 ">{posts?.msg}</p>
    </>
  )

  return (
    <nav className="flex items-center justify-around flex-wrap mt-2 p-2">
     {posts?.data?.map((post, i) => (
        <section key={i} className="w-[200px] h-[13rem] shadow-sm transition-[200ms] cursor-pointer hover:scale-105">
            <Image src={`/${post.image}`} width={200} height={140} alt="post" className="w-full h-full object-cover rounded-xl"/>
        </section>
     ))}   
     
    </nav>
  )
}

export default UserPost