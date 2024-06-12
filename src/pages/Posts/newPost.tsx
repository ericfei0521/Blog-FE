import { useState } from "react"

const NewPost = () => {
    const [data, setData] = useState<{
        title: string
        content: string
        image: string | null
    }>({
        title: "",
        content: "",
        image: null,
    })

    const upload = () => {
        console.log(data)
        fetch("http://localhost:8080/posts/create-post", {
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            method: "post",
        })
            .then((res) => console.log("res", res))
            .catch((err) => console.log(err))
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
                    setData({ ...data, image: e.target.value })
                }}
            />
            <button onClick={upload}>Submit</button>
        </div>
    )
}

export default NewPost
