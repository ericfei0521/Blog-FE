import { useState } from "react"

const SignUp = () => {
    const [showPWD, setShowPWD] = useState(false)
    const [data, setData] = useState<{
        email: string
        password: string
    }>({
        email: "",
        password: "",
    })

    const submit = () => {
        fetch("http://localhost:8080/auth/login", {
            body: JSON.stringify(data),
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                const jwtPayload = JSON.parse(
                    window.atob(result.token.split(".")[1])
                )
                localStorage.setItem("expired", jwtPayload.exp)
                localStorage.setItem("token", result.token)
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
            <label htmlFor="password">Password</label>
            <input
                type={showPWD ? "text" : "password"}
                name="password"
                onChange={(e) => {
                    setData({ ...data, password: e.target.value })
                }}
            />
            <input type="checkbox" onChange={() => setShowPWD(!showPWD)} />
            <button onClick={submit}>Log in</button>
        </div>
    )
}
export default SignUp
