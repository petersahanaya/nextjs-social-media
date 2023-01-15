import { Session } from "next-auth"
import useSWR, { Fetcher } from 'swr'
import useSWRMutation from "swr/mutation"
import { FollowType } from "../../type";
import Images from "../Images";
import ListLoading from "./ListLoading";

const getFriends : Fetcher<{followed : FollowType[]}> = async (url : string) => {
    const res = await fetch(url);
    return res.json() 
  }

const ListFriend = ({session, params} : {session? : Session, params? : {id : string}}) => {
    const url = `http://localhost:3000/api/friend?userId=${session?.user?.id ? session?.user?.id : params.id}`
    const { data : follows, isLoading, mutate } = useSWR(url, getFriends)
    const { trigger } = useSWRMutation(url, getFriends)

    const handleFollow = async (userFollowId : string, userId : string) => {   
        const filtering = follows?.followed.filter((follow) => follow.userId !== userId) 

        mutate({followed : filtering!}, {revalidate : false})

        const res = await fetch(`/api/follow`, {
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

    if(isLoading) {
        return <>
            <ListLoading/>
        </>
    }

  return (
    <main className="w-screen pl-20 mt-3">
        {follows?.followed.length ? <>
        {follows?.followed?.map((follow : FollowType, i) => (
                <section key={i} className="w-[85vw] p-3 bg-white shadow-sm rounded-xl">
                    <header className=" flex items-center gap-2 justify-around">
                        <article className="flex items-center gap-2">
                        <Images image={follow.whoFollowProfile} height={30} width={30}/>
                        <p className="text-sm text-stone-700">{follow.whoFollow}</p>
                        </article>
                        <div>
                             <button 
                             onClick={() => handleFollow(follow.whoFollowId, follow.userId)} className="px-4 p-2 bg-white border-[1px] border-blue-500  rounded-full transition-[200ms] shadow-sm text-sm text-blue-500 hover:bg-stone-100">unfriend</button>
                        </div>
                    </header>
                </section>
        ))}
        </> : null}
        {!follows?.followed.length && <>
            <p className="text-center text-sm text-stone-700">This user not have friend/p>
        </> }
    </main>
  )
}

export default ListFriend