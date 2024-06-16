import { useEffect, useState, useRef } from "react";
import ILyric from "@/interface/ILyric";

type MusicLyricsProps = {
    className?: string,
    lyrics?: string,
    currentDuration?: number,
    setCurrentDuration?: (duration: number) => void,
};

export default function MusicLyrics({ className, lyrics, currentDuration, setCurrentDuration }: MusicLyricsProps) {

    const [lyricsData, setLyricsData] = useState<ILyric[]>();
    const lyricsRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {

        if (lyrics == undefined) return;

        const fetchLyricsData = async () => {
            const response = await fetch(`/music/${lyrics}`);
            const jsonData = await response.json();
            setLyricsData(jsonData);
        };

        fetchLyricsData();

    }, [lyrics]);

    useEffect(() => {
        if (!currentDuration || !lyricsData) return;

        const activeLyricIndex = lyricsData.findIndex(lyric => currentDuration >= lyric.begin && currentDuration <= lyric.end);
        if (activeLyricIndex !== -1 && lyricsRefs.current[activeLyricIndex]) {
            lyricsRefs.current[activeLyricIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [currentDuration, lyricsData]);

    return (
        <div className={`relative flex flex-col gap-5 p-14 bg-[#393939] overflow-y-auto overflow-x-hidden w-full text-xl font-bold text-white ${className}`}>
            {
                lyricsData ? 
                lyricsData.map((lyric, index) => {
                    return (
                        <button
                            ref={el => { lyricsRefs.current[index] = el; }}
                            onClick={setCurrentDuration ? () => setCurrentDuration(lyric.begin) : undefined}
                            className="text-left"
                            key={index}
                            style={{
                                opacity: currentDuration && (currentDuration >= lyric.begin && currentDuration <= lyric.end) ? 1 : 0.4
                            }}
                        >
                            {lyric.text}
                        </button>
                    );
                })
                :
                <h1 className="opacity-[0.4]">This is where you see the lyrics.</h1>
            }
        </div>
    );

}