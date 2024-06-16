import Head from "next/head";

type TembangHeadProps = {
    title?: string,
    description?:  string
};

export default function TembangHead({title, description}: TembangHeadProps) {
    return <Head>
        <title>{`Tembang - ${title ?? 'Web Music Player'}`}</title>
        <link rel="shortcut icon" href={`${process.env.baseUrl}/favicon.ico`} type="image/x-icon" />
        <meta name="description" content={description ?? 'Dengarkan musik gratis tanpa iklan'} />
    </Head>
}