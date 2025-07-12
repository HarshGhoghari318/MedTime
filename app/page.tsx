

import Link from "next/link";

export default async function Home() {


  

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-white to-[#f1f8e9] text-center p-6">
      <div className="max-w-xl">
        <div className="text-6xl mb-4">💊</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to MedTime</h1>
        <p className="text-gray-600 text-lg mb-6">
          The smart way to track medications for your family. Add profiles for your loved ones and never miss a dose.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="bg-[#00796b] text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-[#004d40] transition"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-white text-[#00796b] border border-[#00796b] px-6 py-3 rounded-xl font-medium shadow hover:bg-[#e0f2f1] transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
