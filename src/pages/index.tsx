import type { InferGetStaticPropsType } from "next"
import Head from "next/head"
import Link from "next/link"

export const getStaticProps = async () => {
    const res = await fetch("http://localhost:8080/posts")
    const result = await res.json()
    return { props: { result } }
}

const Home = ({ result }: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log("result", result)
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>hello</h1>
                <Link href="/new-post">
                    <button>+New Post</button>
                </Link>
            </main>
        </>
    )
}

export default Home
