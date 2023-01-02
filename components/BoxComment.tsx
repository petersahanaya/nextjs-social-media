import { CommentType } from "../type"
import Images from "./Images"

const BoxComment = ({comment} : {comment : CommentType}) => {
  return (
    <main className="w-screen rounded-xl h-max bg-white p-2 ">
        <header className="p-2">
                <section className="flex items-center gap-2"> 
                    <Images image={comment.profile}/>
                    <div className="flex flex-col justify-center ">
                        <p className="text-stone-700 text-[1rem] font-[500]">{comment.username}</p>
                        <p className="text-stone-500 text-[.8rem] leading-3">3 day's ago</p>
                    </div>
                </section>
        </header>
        <article className="w-full">
            <p className="text-stone-700 text-sm ml-[4rem]">{comment.desc}</p>
        </article>
    </main>
  )
}

export default BoxComment