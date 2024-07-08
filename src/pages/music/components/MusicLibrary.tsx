import IMusic from "@/interface/IMusic";
import MusicCard from "./MusicCard";
import Link from "next/link";

type MusicLibraryProps = {
    className?: string,
    data?: Array<IMusic>
};

export default function MusicLibrary({className, data}: MusicLibraryProps) {

    return (
        <div className={`flex flex-col bg-[#2a2a2a] text-white p-5 gap-5 w-fit ${className}`}>
            <h1 className="font-bold text-gray-300">Music Library</h1>
            {/* <div className="flex flex-row justify-between items-center">
                <Link href={'/music/add'}>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"/>
                        <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </Link>
            </div> */}
            <div className="flex flex-col gap-3 overflow-x-hidden overflow-y-auto">
                {
                    data ? 
                    data.map((data, index) => {
                        return <MusicCard id={data.id} key={index} image={data.image} name={data.name} artist={data.artist} />
                    })
                    :
                    <h1 className="opacity-50">Sorry, No music can be played...</h1>
                }
            </div>
        </div>
    );
}