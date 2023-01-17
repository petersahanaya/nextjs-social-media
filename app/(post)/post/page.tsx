'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"
import { FaTelegramPlane } from 'react-icons/fa'
import { BiWorld, BiPhotoAlbum } from 'react-icons/bi'
import { ChangeEvent, useState } from "react"
import Link from "next/link"
import { RiHomeSmile2Line } from "react-icons/ri"
import Images from "../../../components/Images"
import { useRouter } from "next/navigation"

const Post = () => {
    const { data: session } = useSession()
    const [img, setImg] = useState<FileList | null>(null)
    const [preview, setPreview] = useState("")
    const [desc, setDesc] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDesc = (e: ChangeEvent<HTMLInputElement>) => {
        if (!preview || !img) return alert("You Should Choose Photo First..")
        setDesc(e.target.value)
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target

        if (files?.length) {
            setImg(files)
            setPreview(URL.createObjectURL(files![0]))
        }
    }

    const handlePost = (async () => {
        if (desc && img) {
            const formData = new FormData()
            setLoading(true)
            const cloudUrl = process.env.CLOUD_URL!;
            formData.append('file', img![0], img![0].name)
            formData.append("upload_preset", "social-upload")
                const res = await fetch(cloudUrl, {
                    method: "POST",
                    headers: {},
                    body: formData
                })
                const data: Awaited<{ secure_url: string }> = await res.json()
                if (res.ok) {
                    try {
                        const result = await fetch("https://p3social.vercel.app/api/desc", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ desc, image: data.secure_url, profile: session?.user?.image!, username: session?.user?.name!, userId: session?.user?.id })
                        })
                        
                        const resp = await result.json()
    
                        if (result.ok) {
                            setLoading(false)
                            setSuccess("Post Uploaded")
        
                            setTimeout(() => {
                                setSuccess("")
                                router.push('/')
                            }, 2000)
                        }
                    }catch(e) {
                        console.error(e)
                    }
            }
        }
    })

    return (
        <>
            <main className="w-screen h-screen overflow-hidden bg-slate-100">
                <header className="w-screen h-max p-3 bg-white flex items-center gap-2 px-10 md:pl-20">
                    <Images image={session?.user?.image!} width={65} height={65} />
                    <div>
                        <p className="text-stone-700 font-[500]">{session?.user?.name}</p>
                        <span className="flex items-center gap-2 ">
                            <BiWorld color="rgb(50, 50, 50)" />
                            <p className="text-stone-600 text-[.8rem]">Public</p>
                        </span>
                    </div>
                </header>
                <section className="w-screen h-max p-3 bg-white shadow-sm md:pl-20">
                    <input onChange={handleDesc} className="w-screen outline-none p-3 text-sm" type="text" placeholder="What You Want To Tell?" />
                </section>
                {preview && img &&
                    <article className="mt-3 w-screen flex flex-col items-center">
                        <section className="rounded-xl w-[80vw] h-[20rem] bg-white shadow-sm md:w-[60vw] lg:w-[40vw] xl:w-[40vw]">
                            <header className="flex items-center gap-2 p-3">
                                <Image className="rounded-full" src={session?.user?.image!} alt="profile" width={40} height={40} />
                                <p className="text-stone-700 text-sm">{session?.user?.name}</p>
                            </header>
                            <Image className="w-full object-cover h-[13rem]" src={preview} width={200} height={200} alt="PostImage" />
                            <div className="border-t-stone-600 border-t-[1px]">
                                <p className="text-stone-700 text-sm p-3">{!desc ? "Description.." : desc}</p>
                            </div>
                        </section>
                    </article>
                }
                <footer>
                    <footer className='fixed bottom-0 right-0 w-screen h-[11vh] bg-white flex justify-around items-center md:h-screen md:w-[4rem] md:flex md:flex-col-reverse md:justify-around md:items-center md:left-0 md:top-0 z-1'>
                        <Link href="/">
                            <RiHomeSmile2Line size={28} color="rgb(50, 50, 50)" />
                        </Link>
                        <div>
                            <label htmlFor="galery">
                                <BiPhotoAlbum size={55} className="text-stone-700 p-3 rounded-full cursor-pointer transition-[200ms]" />
                            </label>
                            <input name="file" onChange={handleFile} id="galery" type="file" className="hidden" accept="image/*" />
                        </div>
                        <div disabled={loading} onClick={handlePost}>
                            <FaTelegramPlane size={47} className="bg-blue-500 text-white p-3 rounded-full cursor-pointer transition-[200ms] shadow-md hover:bg-blue-600" />
                        </div>
                    </footer>
                </footer>
                {success && <p className="bg-stone-800 text-stone-100 w-[80vw] rounded-xl fixed top-[10px] right-[10%] text-center text-sm p-2">{success}</p>}
                {loading && <p className="bg-stone-800 text-stone-100 w-[80vw] rounded-xl fixed top-[10px] right-[10%] text-center text-sm p-2">Loading..</p>}
            </main>
        </>
    )
}

export default Post
