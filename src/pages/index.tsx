import Link from "next/link";
import TembangHead from "./components/TembangHead";

export default function Page() {
    return (
        <>
            <TembangHead/>
            <div className="flex flex-col justify-center items-center w-full h-screen text-white gap-5">
                <h1 className="text-3xl font-bold">Welcome To Tembang 👋</h1>
                <p>Sorry, the homepage still looks bad.</p>
                <Link className="hover:opacity-80" href={'/music'}>Go To Music Library</Link>
            </div>
        </>
    );
}