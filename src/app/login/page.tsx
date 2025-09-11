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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden"
      >
        {/* Header con logo */}
        <div className="bg-blue-600 flex flex-col items-center justify-center py-6">
          <Image
            src="/logo.png" // coloca tu imagen en /public/logo.png
            alt="Logo"
            width={80}
            height={80}
            priority
          />
          <h1 className="text-2xl font-bold text-white mt-2">IMPRO ERP</h1>
          <p className="text-blue-100 text-sm">Gestión de nómina y RRHH</p>
        </div>

        {/* Body del formulario */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Iniciar Sesión
          </h2>

          {error && (
            <p className="text-red-600 mb-2 text-center font-medium">
              {error}
            </p>
          )}

          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  )
}
