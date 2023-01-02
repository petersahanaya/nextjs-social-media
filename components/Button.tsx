"use client"
import { signIn, signOut } from "next-auth/react"

const Button = ({signIns = false, style = ""}) => {
  return (
    <>
        {signIns ? 
            <button className={style} onClick={() => signIn("google")}>Sign in</button>
         : <button className={style} onClick={() => signOut()}>Sign out</button>}
    </>
  )
}

export default Button