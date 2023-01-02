import { unstable_getServerSession } from "next-auth"
import Images from "../../../../components/Images"
import UserPost from "../../../../components/profile/UserPost"
import Switch from "../../../../components/Switch"
import { authOption } from "../../../../pages/api/auth/[...nextauth]"

const Profile = async () => {
  const session = await unstable_getServerSession(authOption)
  return (
    <main className="bg-slate-100 w-screen h-screen relative">
      <header className="w-screen h-[11vh] flex justify-around items-center bg-white shadow-sm">
          <Images image={session?.user?.image!} width={65} height={65} />
          <p className="text-stone-700 font-[500]">{session?.user?.name}</p>
          <span>
            <p className="font-bold">. . .</p>
          </span>
      </header>
      {/* @ts-ignore */}
      {session && <UserPost session={session}  />}
      <Switch/>
    </main>
  )
}

export default Profile