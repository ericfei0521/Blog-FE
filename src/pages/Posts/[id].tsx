import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

// Define type for the post data
type PostData = {
    imageUrl: string
    _id: string
    title: string
    content: string
    isAuth?: boolean
}

// Define the Post component
const Post = () => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [data, setData] = useState<PostData>()
    const [imageData, setImageData] = useState<FileList | null>(null)
    const router = useRouter()

    const upload = () => {
        if (!data) return
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
                setData(result.post as PostData)
                setIsEditMode(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const deletePost = () => {
        if (!data) return
        const token = localStorage.getItem("token")

        fetch(`http://localhost:8080/posts/post/${data._id}`, {
            method: "DELETE",
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            } as HeadersInit,
        })
            .then(() => {
                return router.push("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        const fetchPostData = async () => {
            const { id } = router.query
            if (!id) return

            const apiUrl = `http://localhost:8080/posts/post/${id}`
            const token = localStorage.getItem("token")

            try {
                const res = await fetch(apiUrl, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                    } as HeadersInit,
                })
                if (!res.ok)
                    throw new Error(`Failed to fetch data from ${apiUrl}`)

                const result: PostData = await res.json()
                setData(result)
            } catch (error) {
                console.error(error)
            }
        }

        fetchPostData()
    }, [router])

    if (!data) return <div>Loading...</div> // or any other fallback UI

    // Render post details
    return (
        <div>
            {data.isAuth && (
                <>
                    <button onClick={() => setIsEditMode(!isEditMode)}>
                        {isEditMode ? "read" : "edit"}
                    </button>
                    <button onClick={deletePost}>Delete</button>
                </>
            )}

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
