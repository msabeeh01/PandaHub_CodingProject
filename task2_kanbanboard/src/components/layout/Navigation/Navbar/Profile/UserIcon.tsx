import Image from "next/image"

interface UserIconProps {
    img: string;
}

const UserIcon = ({img}: UserIconProps) => {
    return (
        <div className="rounded-full overflow-hidden">
            <Image src={img} width={38} height={38} alt="User profile picture" className="object-cover"/>
        </div>
    )
}

export default UserIcon