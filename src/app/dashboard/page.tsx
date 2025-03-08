"use client";
import { ReactElement, useEffect, useState } from "react";
import { IUserData } from "@/common/interfaces";

export default function Dashboard() {
	const [user, setUser] = useState<string>("");
	const [data, setData] = useState<IUserData>({
		from: "",
		to: "",
		data: {
			id: 0,
			date: "",
			session: "",
			kj: 0,
			protein: 0
		}
	});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		// Check user from local storage
		// TODO: Change when connected to DB
		if (typeof window !== "undefined" && window.localStorage) {
			// const foundUser = localStorage.getItem("user") ?? "";
			const foundUser = "user1";
			// Set error if no user is found
			if (foundUser) {
				setUser(foundUser);
			} else {
				setError("No user found");
			}
		} else {
			console.warn("localStorage is not available");
		}
	}, []);

	useEffect(() => {
		console.log("Fetching data");

		// Fetch the JSON data from the public directory
		fetch("/db.json")
			.then((res) => res.json())
			.then((data) => {
				// Set error if no data is found
				setError("");
				// Check if user data exists
				if (data && data[user]) {
					setData(data[user]);
				} else {
					setError("Cannot fetch data");
				}
			})
			.catch((error) => console.error("Error fetching data:", error));
		// Loading doesn't fully cover the cannot fetch data error
		setLoading(false);
	}, [user]);

	const getUserData = (): ReactElement => {
		if (error) {
			return <span>{error}</span>;
		} else {
			return (
				<div>
					<div>{data.from}</div>
					<div>{data.to}</div>
				</div>
			);
		}
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<p>test</p>
			<div>{loading ? "LOADING" : getUserData()}</div>
		</div>
	);
}
