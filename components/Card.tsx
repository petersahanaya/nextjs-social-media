'use client'
import { useSession } from "next-auth/react"
import Image from "next/image"
import { LikesType, PostType } from "../type"
import Images from "./Images"
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { GoComment } from 'react-icons/go'
import useMutation from "swr/mutation"
import { useSWRConfig } from "swr"
import { useRouter } from "next/navigation"
import Link from "next/link"

const isLike = (likes: Array<LikesType>, username: string): boolean => {
    const find = likes?.find((like) => like.username === username)

    if (find) return true
    return false
}

const fetcher = (url: string) => {
    fetch("/api/post").then((res) => res.json())
}

interface CardProps extends PostType {
    initialData: PostType[]
}

const Card: React.FC<CardProps> = ({ username, profile, image, desc, postId, likes, initialData }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const { mutate } = useSWRConfig()
    const { trigger } = useMutation("/api/post", fetcher)

    const handleLike = async (postId: string) => {
        const mappedData = initialData.map((data) => {
            if (data.postId === postId) {
                return {
                    ...data,
                    likes: [...data.likes, { username: session?.user?.name, postId }]
                }
            }else {
                return data
            }
        })
        mutate('/api/post', mappedData, { revalidate: false })

        const res = await fetch(`/api/desc?postId=${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ postId, username: session?.user?.name, __type : "like" })
        })

        if (res.ok) {
            trigger()
            router.refresh()
        }

        const data = await res.json()
    }

    const handleDislike = async (postId : string) => {
        const mappedData = initialData.map((data) => {
            if (data.postId === postId) {
                return {
                    ...data,
                    likes: data.likes.filter((like) => like.username !== session?.user?.name)
                }
            }else {
                return data
            }
        })

        mutate('/api/post', mappedData, { revalidate: false })

        const res = await fetch(`/api/desc?postId=${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ postId, username: session?.user?.name, __type : "unlike" })
        })

        if (res.ok) {
            trigger()
            router.refresh()
        }

        const data = await res.json()
    }

    const handleDblClick = (postId : string) => {
        if(isLike(likes, session?.user?.name!)) {
            return handleDislike(postId)
        }

        return handleLike(postId)
    }

    return (
        <nav className="bg-white w-[80vw] h-[24.5rem] rounded-xl shadow-sm">
            <header className={`w-full flex items-center gap-2 p-3 ${session?.user?.name === username && "justify-around"}`}>
                <div className="flex justify-around items-center gap-2">
                    <Images image={profile} radius="rounded-full shadow-md cursor-pointer" />
                    <p className="text-stone-700 text-sm">{username}</p>
                </div>
                {session?.user?.name === username &&
                    <span className="cursor-pointer">
                        <p className="font-bold">. . .</p>
                    </span>
                }
            </header>
            <article className="w-full">
                <section>
                    <Image onDoubleClick={() => handleDblClick(postId)} className="w-full object-cover h-[13rem]" src={`/${image}`} alt="Post" fill={false} width={340} height={250} />
                </section>
                <section className="w-full p-3 flex items-center  gap-2">
                    {!isLike(likes, session?.user?.name!) ?
                        <AiOutlineHeart onClick={() => handleLike(postId)} size={27} className="cursor-pointer hover:text-stone-600" /> : <AiFillHeart onClick={() => handleDislike(postId)} size={27} className="cursor-pointer hover:text-stone-600" color="#fa2077"/>
                    }
                    <Link href={`/comment/${postId}`}>
                        <GoComment size={27} className="cursor-pointer  hover:text-stone-600" />
                    </Link>
                </section>
            </article>
            <footer className="w-full">
                <p className="ml-4 text-stone-700 text-sm">Liked by {likes.length} and other's </p>
                <div className="p-3 flex items-center gap-2">
                    <p className="text-stone-800 font-[500] text-[.9rem]">{username}</p>
                    <p className="text-stone-700 text-[.8rem]">{desc}</p>
                </div>
            </footer>
        </nav>
    )
}

export default Card