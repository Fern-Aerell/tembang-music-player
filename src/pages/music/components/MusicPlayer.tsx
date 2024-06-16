import RepeatType from "@/enum/RepeatType";
import IMusic from "@/interface/IMusic";
import Image from "next/image";

type MediaPlayerProps = {
    className?: string,
    music?: IMusic,
    volume?: number,
    volumeChange?: (volume: number) => void,
    mute?: boolean,
    muteToggle?: (status: boolean) => void,
    play?: boolean,
    playToggle?: (status: boolean) => void,
    currentDuration?: number,
    currentDurationChange?: (duration: number) => void,
    endDuration?: number,
    onPrevious?: () => void,
    onNext?: () => void,
    repeatType?: RepeatType,
    repeatToggle?: (type: RepeatType) => void,
};

function formatTime(secs: number) {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = Math.floor(secs - minutes * 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function MusicPlayer({ className, music, volume, volumeChange, mute, muteToggle, play, playToggle, currentDuration, currentDurationChange, endDuration, onPrevious, onNext, repeatType, repeatToggle }: MediaPlayerProps) {

    return (
        <div className={`flex flex-row bg-[#232323] w-full justify-center items-center p-5 text-white flex-shrink-0 ${className}`}>

            <div className="flex flex-row flex-1 gap-3 p-3 rounded-md" style={
                {
                    opacity: music ? 1 : 0.3
                }
            }>
                {
                    music && music.image.length > 0 ?
                    <Image src={`${process.env.baseUrl}/music/${music.image}`} width={48} height={48} className='rounded-md' alt='gambar lagu' />
                    :
                    <div className="bg-white h-[48px] w-[48px] rounded-md flex-shrink-0"></div>
                }
                <div className="flex flex-col justify-center items-start gap-1 text-sm">
                    <h1 className='font-bold'>{music ? music.name : 'Music Name'}</h1>
                    <h2 className='opacity-80'>{music ? music.artist : 'Artist Name'}</h2>
                </div>
            </div>

            <div className="flex flex-col flex-[5] justify-center items-center gap-5" style={
                {
                    opacity: music ? 1 : 0.3
                }
            }>
                <div className="flex flex-row gap-5">
                    <button disabled={music == undefined} onClick={onPrevious} className="bg-white rounded-xl p-2 font-bold">
                        <Image src={`${process.env.baseUrl}/assets/svg/previous.svg`} alt="previous" width={25} height={25} />
                    </button>
                    {
                        play != undefined && playToggle != undefined &&
                        <button disabled={music == undefined} onClick={() => playToggle(!play)} className="bg-white rounded-xl p-2 font-bold">
                            <Image src={play ? `${process.env.baseUrl}/assets/svg/pause.svg` : `${process.env.baseUrl}/assets/svg/play.svg`} alt="play/pause" width={25} height={25} />
                        </button>
                    }
                    <button disabled={music == undefined} onClick={onNext} className="bg-white rounded-xl p-2 font-bold">
                        <Image className="rotate-180" src={`${process.env.baseUrl}/assets/svg/previous.svg`} alt="next" width={25} height={25} />
                    </button>
                    {
                        repeatType != undefined && repeatToggle != undefined &&
                        <button disabled={music == undefined} onClick={() => {
                            switch (repeatType) {
                                case RepeatType.disable:
                                    repeatToggle(RepeatType.enable)
                                    break;
                                case RepeatType.enable:
                                    repeatToggle(RepeatType.one)
                                    break;
                                case RepeatType.one:
                                    repeatToggle(RepeatType.disable)
                                    break;
                            }
                        }} className="bg-white rounded-xl p-2 font-bold" style={
                            {
                                opacity: repeatType == RepeatType.disable ? 0.5 : 1
                            }
                        }>
                            <Image src={
                                repeatType == RepeatType.one ?
                                `${process.env.baseUrl}/assets/svg/repeat_one.svg`
                                :
                                `${process.env.baseUrl}/assets/svg/repeat.svg`
                            } alt="next" width={25} height={25} />
                        </button>
                    }
                </div>
                {
                    currentDuration != undefined && currentDurationChange != undefined && endDuration != undefined &&
                    <div className="flex flex-row gap-5">
                        <span>{formatTime(currentDuration)}</span>
                        <input
                            className="w-[500px]"
                            type="range"
                            name="duration"
                            id="duration"
                            min={0}
                            max={endDuration}
                            step={0.1}
                            value={currentDuration}
                            onChange={(event) => currentDurationChange(parseFloat(event.target.value))}
                            disabled={music == undefined}
                        />
                        <span>{formatTime(endDuration)}</span>
                    </div>
                }
            </div>

            {
                <div className="flex flex-row flex-1 justify-center items-center gap-3" style={
                    {
                        opacity: music ? 1 : 0.3
                    }
                }>
                    {
                        volume != undefined && mute != undefined && muteToggle != undefined &&
                        <button disabled={music == undefined} onClick={() => muteToggle(!mute)} className="bg-white rounded-xl p-2 font-bold">
                            <Image src={
                                volume > 0.5 && !mute ?
                                    `${process.env.baseUrl}/assets/svg/volume_max.svg` :
                                    volume > 0 && !mute ?
                                        `${process.env.baseUrl}/assets/svg/volume_min.svg` :
                                        `${process.env.baseUrl}/assets/svg/volume_off.svg`
                            } alt="volume icon" width={20} height={20} />
                        </button>
                    }
                    {
                        volume != undefined && volumeChange != undefined && mute != undefined && muteToggle != undefined &&
                        <input
                            id="volume"
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={mute ? 0 : volume}
                            onChange={(event) => {
                                if (mute) muteToggle(false);
                                volumeChange(parseFloat(event.target.value));
                            }}
                            disabled={music == undefined}
                        />
                    }
                </div>
            }
        </div>
    );
}