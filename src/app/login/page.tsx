"use client";
import Link from "next/link";

export default function Login() {
	const handleLogin = (user: string) => {
		// Store the user in localStorage
		localStorage.setItem("user", user);
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<h1 className="text-5xl">Lite n Easy tracking app</h1>
			<h2>Hello, who are you?</h2>
			<Link
				className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
				href="home"
				onClick={() => handleLogin(process.env.NEXT_PUBLIC_DB_USER1 as string)}
			>
				{process.env.NEXT_PUBLIC_DB_USER1}
			</Link>
			<Link
				className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
				href="home"
				onClick={() => handleLogin(process.env.NEXT_PUBLIC_DB_USER2 as string)}
			>
				{process.env.NEXT_PUBLIC_DB_USER2}
			</Link>
		</div>
	);
}
