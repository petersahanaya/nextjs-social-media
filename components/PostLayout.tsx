'use client'
import { SWRConfig } from "swr"
import { PostType } from "../type"

const PostLayout : React.FC<{children : React.ReactNode, post : Array<PostType>}> = ({children, post}) => {
  return (
    <SWRConfig value={{fallback : {"https://p3social.vercel.app/api/post" : post}}}>
      {children}
    </SWRConfig>
  )
}

export default PostLayout