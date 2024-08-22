import { useState } from "react"
import { useRouter } from "next/router"

const NewPost = () => {
    const [data, setData] = useState<{
        title: string
        content: string
        image: FileList | null
    }>({
        title: "",
        content: "",
        image: null,
    })
    const router = useRouter()
    const upload = () => {
        const formData = new FormData()
        const token = localStorage.getItem("token")

        formData.append("title", data.title)
        formData.append("content", data.content)
        if (data.image && data.image.length > 0)
            formData.append("image", data.image[0]) // Append the first file in the FileList

        fetch("http://localhost:8080/posts/create-post", {
            body: formData,
            method: "post",
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            } as HeadersInit,
        })
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                const { post } = result
                return router.push(`/Posts/${post._id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>New Post</h1>
            <input
                type="text"
                name="title"
                onChange={(e) => {
                    setData({ ...data, title: e.target.value })
                }}
            />
            <textarea
                name="content"
                rows={3}
                onChange={(e) => {
                    setData({ ...data, content: e.target.value })
                }}
            />
            <input
                type="file"
                name="image"
                onChange={(e) => {
                    setData({ ...data, image: e.target.files })
                }}
            />
            <button onClick={upload}>Submit</button>
        </div>
    )
}

export default NewPost
