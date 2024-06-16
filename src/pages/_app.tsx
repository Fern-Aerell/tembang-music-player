import { AppProps } from "next/app";
import '@/css/globals.css';

export default function App({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}