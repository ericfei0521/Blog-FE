import { useState } from "react"

const SignUp = () => {
    const [showPWD, setShowPWD] = useState(false)
    const [data, setData] = useState<{
        email: string
        name: string
        password: string
    }>({
        email: "",
        name: "",
        password: "",
    })

    const submit = () => {
        fetch("http://localhost:8080/auth/signup", {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                console.log("result", result)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                onChange={(e) => {
                    setData({ ...data, email: e.target.value })
                }}
            />
            <label htmlFor="name">Name</label>

            <input
                type="text"
                name="name"
                onChange={(e) => {
                    setData({ ...data, name: e.target.value })
                }}
            />
            <label htmlFor="password">Password</label>
            <input
                type={showPWD ? "text" : "password"}
                name="password"
                onChange={(e) => {
                    setData({ ...data, password: e.target.value })
                }}
            />
            <input type="checkbox" onChange={() => setShowPWD(!showPWD)} />
            <button onClick={submit}>Submit</button>
        </div>
    )
}
export default SignUp
