import IMusic from "@/interface/IMusic";
import MusicCard from "./MusicCard";

type MusicLibraryProps = {
    className?: string,
    data?: Array<IMusic>
};

export default function MusicLibrary({className, data}: MusicLibraryProps) {

    return (
        <div className={`flex flex-col bg-[#2a2a2a] text-white p-5 gap-5 w-fit ${className}`}>
            <h1 className="font-bold text-gray-300">Music Library</h1>
            <div className="flex flex-col gap-3 overflow-x-hidden overflow-y-auto">
                {
                    data ? 
                    data.map((data, index) => {
                        return <MusicCard id={data.id} key={index} name={data.name} artist={data.artist} />
                    })
                    :
                    <h1 className="opacity-50">Sorry, No music can be played...</h1>
                }
            </div>
        </div>
    );
}