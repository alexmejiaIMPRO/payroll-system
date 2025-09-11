"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError("Credenciales inválidas")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        {/* Logo arriba */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.png" // <-- coloca tu imagen en /public/logo.png
            alt="Logo"
            width={120}
            height={120}
            priority
          />
        </div>

        <h1 className="text-xl font-bold mb-4 text-center text-black">
          Login
        </h1>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm mb-1 text-black">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-black">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  )
}
