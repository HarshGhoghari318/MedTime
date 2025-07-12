"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { HiOutlineMail } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();

        try {
            const response = await axios.post("/api/signup", {
                name,
                email,
                image,
                password,
            });

            toast.success("User created successfully!");
            setEmail("");
            setImage("");
            setName("");
            setPassword("");
            router.push("/signin");
        } catch (error) {
            console.error("Signup failed:", error);
            toast.error("Signup failed. Try again.");
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#e8f5e9] p-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg border border-green-100">
                <h1 className="text-2xl font-bold text-center mb-6 text-green-800">
                    Create Your MedTime Account
                </h1>

                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-green-300 text-green-900 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-green-300 text-green-900 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-green-300 text-green-900 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                    <input
                        type="text"
                        placeholder="Profile Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-green-300 text-green-900 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition duration-300 flex items-center justify-center gap-2"
                    >
                        <HiOutlineMail className="text-xl" />
                        Sign Up with Email
                    </button>

                    <hr className="border-t border-gray-200 my-4" />

                    <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="w-full py-3 bg-white hover:bg-green-100 text-black font-bold rounded-md transition duration-300 flex items-center justify-center gap-2 border border-gray-300"
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-green-700 font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}
