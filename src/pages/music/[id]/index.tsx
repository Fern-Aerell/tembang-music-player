import TembangHead from "@/pages/components/TembangHead";
import MusicBody from "../components/MusicBody";
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    const {id} = router.query;
    return (
        <>
            <TembangHead/>
            <MusicBody id={parseInt(id as string)} />
        </>
    );
}