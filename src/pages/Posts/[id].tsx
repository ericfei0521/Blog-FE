// Import necessary modules
import type { GetServerSideProps } from "next"

// Define type for the post data
type PostData = {
    id: number
    title: string
    content: string
}

// Define the server-side props function
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context
    const { id } = params as { id: string } // Ensure id is correctly typed
    const apiUrl = `http://localhost:8080/posts/post/${id}`

    try {
        // Fetch data from API
        const res = await fetch(apiUrl)
        if (!res.ok) {
            throw new Error(`Failed to fetch data from ${apiUrl}`)
        }

        // Parse JSON response
        const result: PostData = await res.json()
        return {
            props: {
                result,
            },
        }
    } catch (error) {
        console.error("Error fetching data:", error)
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        }
    }
}

// Define the Post component
const Post = ({ result }: { result: PostData }) => {
    // Handle cases where result is undefined or null
    if (!result) {
        return <div>Loading...</div> // or any other fallback UI
    }

    // Render post details
    return (
        <div>
            <h1>{result?.title}</h1>
            <p>{result?.content}</p>
        </div>
    )
}

export default Post
