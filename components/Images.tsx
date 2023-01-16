"use client"
import Image from "next/image"

const Images : React.FC<{image : string, width? : number, height? : number, radius? : string}> = ({image, width = 45, height = 45, radius = 'rounded-full shadow-md'}) => {
  return (
    <>
    {image ?
        <Image className={radius} src={image} alt="profile" width={width} height={height}/> :
        <Image className={radius} src="/profile.jpeg" alt="profile" width={width} height={height}/>
    }
    </>
    )
}

export default Images