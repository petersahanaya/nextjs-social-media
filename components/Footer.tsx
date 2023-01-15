"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { RiHomeSmile2Line, RiHomeSmile2Fill } from "react-icons/ri";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Link from "next/link";
import Images from "./Images";

const Footer = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  return (
    <footer className="fixed bottom-0 right-0 w-screen h-[11vh] bg-white flex justify-around items-center md:h-screen md:w-[4rem] md:flex md:flex-col-reverse md:justify-around md:items-center md:left-0 md:top-0 z-1">
      <Link href="/">
        {pathName === "/" ? (
          <RiHomeSmile2Fill size={28} color="rgb(50, 50, 50)" />
        ) : (
          <RiHomeSmile2Line size={28} color="rgb(50, 50, 50)" />
        )}
      </Link>
      <Link href="/friends">
        <FaUserFriends size={30} color="rgb(50, 50, 50)" />
      </Link>
      <Link href="/post">
        <MdOutlineAddCircleOutline size={30} color="rgb(50, 50, 50)" />
      </Link>
      <Link href="/profile">
        <Images image={session?.user?.image!} />
      </Link>
    </footer>
  );
};

export default Footer;

