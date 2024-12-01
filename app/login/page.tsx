"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import SubmitButton from "../component/SubmitButton"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/action/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      // On successful login, redirect to the dashboard or any other page
      router.push("/dashboard")
    } else {
      // If login fails, show the error message
      setError(data.message)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-center mb-6">Login</h2>
      <hr className="mb-4" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
          <input
            className="border border-gray-300 rounded-md p-2"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
          <input
            className="border border-gray-300 rounded-md p-2"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center">
          <input className="w-6 h-6 mr-2" type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember" className="text-sm">Remember me</label>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <SubmitButton label="Login" />
        </div>
      </form>
      <br />
      <hr />
      <div className="text-center mt-4">
        <a href="/forgot-password" className="text-blue-500">Forgot password?</a>
      </div>
    </div>
  )
}
