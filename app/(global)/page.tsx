import Posts from "./Posts"
import Header from "./Header"

const Home = async () => {
  return (  
    <main className="bg-slate-100 w-screen h-screen">
      {/*@ts-expect-error Component Promise*/}
      <Header/>
      {/*@ts-expect-error Component Promise*/}
      <Posts/>
    </main>
  )
}

export default Home