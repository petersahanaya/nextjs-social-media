'use client'
import useSWR from 'swr'

const fetcher =  async (url : string) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

const usePost = (url : string) => {
  const { data } = useSWR(url, fetcher)
  console.log(data)

  return {
    data
  }
}

export default usePost