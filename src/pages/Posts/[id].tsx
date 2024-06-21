import { useState } from "react"
import type { GetServerSideProps } from "next"
import Image from "next/image"
// Define type for the post data
type PostData = {
    imageUrl: string
    _id: string
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
        if (!res.ok) throw new Error(`Failed to fetch data from ${apiUrl}`)

        // Parse JSON response
        const result: PostData = await res.json()
        return {
            props: {
                result,
            },
        }
    } catch (error) {
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
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [data, setData] = useState<PostData>(result)
    const [imageData, setImageData] = useState<FileList | null>(null)
    const upload = () => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("content", data.content)
        formData.append("imageUrl", data.imageUrl)
        if (imageData && imageData.length > 0)
            formData.append("image", imageData[0]) // Append the first file in the FileList

        fetch(`http://localhost:8080/posts/post/${data._id}`, {
            body: formData,
            method: "PUT",
        })
            .then((res) => {
                return res.json()
            })
            .then((result: any) => {
                console.log(result)
                setData(result.post as PostData)
                setIsEditMode(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (!result) return <div>Loading...</div> // or any other fallback UI

    // Render post details
    return (
        <div>
            <button onClick={() => setIsEditMode(!isEditMode)}>
                {isEditMode ? "read" : "edit"}
            </button>
            <div>
                {isEditMode ? (
                    <>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) => {
                                setData({ ...data, title: e.target.value })
                            }}
                        />
                        <textarea
                            name="content"
                            rows={3}
                            value={data.content}
                            onChange={(e) => {
                                setData({ ...data, content: e.target.value })
                            }}
                        />
                        {imageData ? (
                            <div>
                                {Array.from(imageData).map((file) => (
                                    <img
                                        key={file.name}
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Image
                                src={data?.imageUrl}
                                width={200}
                                height={200}
                                alt={data.imageUrl}
                            />
                        )}

                        <input
                            type="file"
                            name="image"
                            onChange={(e) => {
                                setImageData(e.target.files)
                            }}
                        />
                        <button onClick={upload}>Submit</button>
                    </>
                ) : (
                    <>
                        <h1>{data?.title}</h1>
                        <p>{data?.content}</p>
                        <Image
                            src={data?.imageUrl}
                            width={200}
                            height={200}
                            alt={data.imageUrl}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default Post
