import { unstable_getServerSession } from "next-auth"
import Button from "../../components/Button"
import Images from "../../components/Images"
import { authOption } from "../../pages/api/auth/[...nextauth]"

const Header = async () => {
  const session = await unstable_getServerSession(authOption)
  
  return (
    <div className="w-screen h-[11vh] bg-white flex justify-around items-center shadow-sm">
      {session ?
      <>
        <section className="flex justify-around items-center gap-2">
          <Images image={session.user?.image!}/>
          <div>
            <p className="text-stone-700 text-[.9rem]">Sign in as</p>
            <p className="text-stone-800 font-[500]">{session.user?.name}</p>
          </div>
        </section>
        <Button  style="bg-blue-500 p-2 text-stone-100 rounded-xl transition-[200ms] shadow-md hover:bg-blue-600 w-[8rem]"/>
      </>
       : 
       <>
         <section>
          <p className="text-stone-700 text-[.9rem]">You're not sign yet..</p>
        </section>
        <Button signIns={true} style="bg-blue-500 p-2 text-stone-100 rounded-xl transition-[200ms] shadow-md hover:bg-blue-600 w-[8rem]"/>
       </>
       }
    </div>
  )
}

export default Header