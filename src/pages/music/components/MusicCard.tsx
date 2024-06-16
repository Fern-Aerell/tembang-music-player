import Image from "next/image";
import Link from "next/link";

type MusicCardProps = { 
    id: number,
    image?: string, 
    name?: string,
    artist?: string,
};

export default function MusicCard({id, image, name, artist}: MusicCardProps) {
    return (
        <Link href={`/music/${id}`} className="flex flex-row gap-3 bg-[#414141] hover:bg-[#4e4e4e] p-3 rounded-md w-[300px]">
            {
                image ?
                <Image src={`${process.env.baseUrl}/${image}`} width={48} height={48} className='rounded-md' alt='gambar lagu' />
                :
                <div className="bg-white h-[48px] w-[48px] rounded-md"></div>
            }
            <div className="flex flex-col justify-center items-start gap-1 text-sm">
                <h1 className='font-bold'>{name}</h1>
                <h2 className='opacity-80'>{artist}</h2>
            </div>
        </Link>
    );
}