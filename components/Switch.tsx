"use client"
import { signOut } from "next-auth/react"

const Switch = () => {
  return (
    <article className="pb-[7rem] pl-5 absolute bottom-0 left-0">
        <section>
          <p className="text-stone-600 text-sm">My Account</p>
          <div className="mt-3">
            <p onClick={() => signOut({callbackUrl : "/"})} className="text-blue-500 cursor-pointer mt-1">Switch to another Account</p>
            <p onClick={() => signOut({callbackUrl : "/"})} className="text-red-600 cursor-pointer mt-1">Log Out</p>
          </div>
        </section>
      </article>
  )
}

export default Switch