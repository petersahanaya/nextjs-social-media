

'use client';

import { useEffect } from "react";

const Error = ({error, reset} :{
    error : Error,
    reset : () => void
}) => {
    useEffect(() => {
        console.error(error);
    }, [error])
    
  return (
    <main className="w-screen h-screen bg-stone-100 flex flex-col justify-center items-center">
        <h4 className="text-4xl text-stone-700">Something went wrong..</h4>
        <button className="text-sm bg-stone-800 mt-3 p-2 rounded-full shadow-md text-white px-4" onClick={() => reset}>Try again</button>
    </main>
  )
}

export default Error