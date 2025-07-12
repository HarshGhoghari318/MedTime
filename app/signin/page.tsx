"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiOutlineMail } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect:false,
    });
    console.log(res)
    if (!res?.ok) {
      toast.error("Credenicials Error!")
    }else{
      setEmail("")
      setPassword("")
      router.push("/profile")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#e8f5e9] p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg border border-green-100">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-800">
          Welcome Back to MedTime 💊
        </h1>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-green-300 text-green-900 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-green-300 text-green-900 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition duration-300 flex items-center justify-center gap-2"
          >
            <HiOutlineMail className="text-xl" />
            Sign In with Email
          </button>

          <hr className="border-t border-gray-200 my-4" />

          <button
            type="button"
            onClick={() => signIn ("google", {callbackUrl:"/profile"}) }
            className="w-full py-3 bg-white hover:bg-green-100 text-black font-bold rounded-md transition duration-300 flex items-center justify-center gap-2 border border-gray-300"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-green-700 font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
