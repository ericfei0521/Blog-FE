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

    const [postData, setPostData] = useState<any>({
        title: "",
        content: "",
        image: null,
    })

    const upload = () => {
        fetch("http://localhost:8080/posts/create-post", {
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            method: "post",
        })
            .then((res) => {
                // Log the response object
                console.log("res", res)
                // Return the parsed JSON content
                return res.json()
            })
            .then((json) => {
                // Log the JSON content
                const { post } = json
                setPostData({
                    title: post.title,
                    content: post.content,
                    image: post.imageUrl,
                })
                console.log("Response JSON:", json)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    console.log(postData)
    return (
        <div style={{ backgroundColor: "gray", height: "100vh" }}>
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

            <h1>title:{postData.title}</h1>
            <div>content:{postData.content}</div>
            <img src={postData.image} alt="test" />
        </div>
    )
}

export default NewPost
