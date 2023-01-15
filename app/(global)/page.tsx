import Posts from "./Posts"
import Header from "./Header"
import { unstable_getServerSession } from "next-auth"
import { authOption } from "../../pages/api/auth/[...nextauth]"

const Home = async () => {
  const session = await unstable_getServerSession(authOption)

  return (  
    <main className="bg-slate-100 w-screen h-screen">
      {/*@ts-expect-error Component Promise*/}
      <Header/>
      {session ?
      <>
      {/*@ts-expect-error Component Promise*/}
        <Posts/>
      </> : <div className="w-screen h-screen bg-stone-100 backdrop-blur-sm fixed z-[-1] top-0 right-0"></div>}
    </main>
  )
}

export default Home