'use client'
import useSWR, { Fetcher } from 'swr'
import { PostType } from '../type'
import Card from './Card'

const fetcher: Fetcher<PostType[]> = async (url: string) => {
  const res = await fetch(url)
  const data: Awaited<{ post: PostType[] }> = await res.json()

  return data.post
}

const Post = () => {
  const { data: posts } = useSWR(`${process.env.PORT}/api/post`, fetcher)

  return (
    <main className='w-screen flex flex-col gap-2 items-center mt-3 '>
      {posts?.map((post, i) => 
        (
        <>
          <Card {...post} key={i} initialData={posts} />
        </>))}
    </main>
  )
}
export default Post