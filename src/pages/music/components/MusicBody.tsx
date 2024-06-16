import { useEffect, useState } from "react";
import MusicLibrary from "../components/MusicLibrary";
import IMusic from "@/interface/IMusic";
import MusicPlayer from "../components/MusicPlayer";
import { Howl } from "howler";
import MusicLyrics from "./MusicLyrics";
import { useRouter } from "next/router";
import RepeatType from "@/enum/RepeatType";

type MusicBodyProps = {
    id?: number
};

export default function MusicBody({ id }: MusicBodyProps) {

    const router = useRouter();

    const [musicData, setMusicData] = useState<Array<IMusic>>();
    const [music, setMusic] = useState<IMusic>();
    const [howl, setHowl] = useState<Howl>();
    const [musicVol, setMusicVol] = useState<number>(1);
    const [musicMute, setMusicMute] = useState<boolean>(false);
    const [musicPlay, setMusicPlay] = useState<boolean>(false);
    const [musicEndDuration, setMusicEndDuration] = useState<number>(0);
    const [musicCurrentDuration, setMusicCurrentDuration] = useState<number>(0);
    const [musicRepeatType, setMusicRepeatType] = useState<RepeatType>(RepeatType.enable);

    function onPrevious() {
        if (id == undefined || musicData == undefined) return;
        const previousId = ((id - 1) < 1) ? musicData.length : (id - 1);
        router.push(`/music/${previousId}`);
    }

    function onNext() {
        if (id == undefined || musicData == undefined) return;
        const nextId = ((id + 1) > musicData.length) ? 1 : (id + 1);
        router.push(`/music/${nextId}`);
    }

    function trackProgress(player: Howl) {
        const interval = setInterval(() => {
            const duration = player.seek() as number;
            setMusicCurrentDuration(duration);
            if (!player.playing()) {
                clearInterval(interval);
            }
        }, 1000);
    }

    useEffect(() => {

        const fetchMusicData = async () => {
            const response = await fetch('/music/music_data.json');
            const json = await response.json();
            setMusicData(json);
        };

        fetchMusicData();

    }, []);

    useEffect(() => {

        if (howl != undefined) {
            setMusicCurrentDuration(0);
            if (musicPlay) {
                howl.stop();
                setMusicPlay(false);
                setTimeout(() => setMusicPlay(true), 1000);
            }
        }

        if (music?.id == id) return;

        if (id == undefined && musicData == undefined) return;

        const tempMusic = musicData?.find((value) => value.id == id);

        if (tempMusic == undefined) return;

        document.title = `${tempMusic?.name} • ${tempMusic?.artist}`;

        setMusic(tempMusic);

    }, [musicData, id]);

    useEffect(() => {

        const tempHowl = new Howl({
            src: [`/music/${music?.file}`],
            html5: true,
            onload: function () {
                setMusicEndDuration(tempHowl.duration());
            },
            onplay: function () {
                trackProgress(tempHowl);
            },
            onseek: function () {
                trackProgress(tempHowl);
            },
            onend: function () {
                musicEnd(tempHowl);
            }
        });

        setHowl(tempHowl);

    }, [music]);

    useEffect(() => {

        if (howl == undefined) return;
        howl.volume(musicVol);

    }, [musicVol]);

    useEffect(() => {

        if (howl == undefined) return;
        howl.mute(musicMute);

    }, [musicMute]);

    useEffect(() => {

        if (howl == undefined) return;

        if (musicPlay) {
            howl.play();
            return;
        }

        howl.pause();

    }, [musicPlay]);

    useEffect(() => {

        if (howl == undefined) return;

        howl.off('end');
        howl.on('end', () => musicEnd(howl));

    }, [musicRepeatType]);

    const musicEnd = (player: Howl) => {
        switch (musicRepeatType) {
            case RepeatType.disable:
                setMusicPlay(false);
                break;
            case RepeatType.enable:
                onNext();
                break;
            case RepeatType.one:
                setMusicPlay(false);
                player.seek(0);
                setMusicCurrentDuration(0);
                setTimeout(() => setMusicPlay(true), 1000);
                break;
        }
    };

    return (
        <div className="flex flex-row w-full">
            <div className="flex flex-col w-full h-screen">
                <div className="flex flex-row w-full h-full overflow-hidden">
                    <MusicLibrary data={musicData} />
                    <MusicLyrics
                        lyrics={music?.lyrics}
                        currentDuration={musicCurrentDuration}
                        setCurrentDuration={(duration) => {
                            howl?.seek(duration);
                            setMusicCurrentDuration(duration);
                        }}
                    />
                </div>
                <MusicPlayer
                    music={music}
                    volume={musicVol}
                    volumeChange={setMusicVol}
                    mute={musicMute}
                    muteToggle={setMusicMute}
                    play={musicPlay}
                    playToggle={setMusicPlay}
                    currentDuration={musicCurrentDuration}
                    currentDurationChange={(duration) => {
                        howl?.seek(duration);
                        setMusicCurrentDuration(duration);
                    }}
                    endDuration={musicEndDuration}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    repeatType={musicRepeatType}
                    repeatToggle={setMusicRepeatType}
                />
            </div>
        </div>
    );
}