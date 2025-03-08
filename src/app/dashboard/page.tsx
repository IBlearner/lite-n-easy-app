"use client";
import { ReactElement, useEffect, useState } from "react";
import { IUserData, IUserPrefs } from "@/common/interfaces";
import { dailyKjMaintenance } from "@/common/constants";

export default function Dashboard() {
	const [user, setUser] = useState<string>("");
	const [userPrefData, setUserPrefData] = useState<IUserPrefs>({
		targetWeight: 0,
		kjDailyGoal: 0,
		proteinDailyGoal: 0,
		stepsDailyGoal: 0,
		exerciseWeeklyGoal: 0,
		exerciseDailyGoal: 0
	});
	const [mealData, setMealData] = useState<IUserData>({
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
		// Set error if no data is found
		setError("");

		// Fetch the meal data
		fetch("/mealData.json")
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					setMealData(data);
				} else {
					setError("Cannot fetch data");
				}
			})
			.catch((error) => console.error("Error fetching data:", error));

		// Fetch the user pref data
		fetch("/userPrefs.json")
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					setUserPrefData(data);
				} else {
					setError("Cannot fetch user preferences");
				}
			})
			.catch((error) => console.error("Error fetching data:", error));

		// Loading doesn't fully cover the cannot fetch data error
		setLoading(false);
	}, [user]);

	const getUserData = (): ReactElement => {
		if (error) {
			return <div>{error}</div>;
		} else {
			return (
				<div>
					<div>{mealData.from}</div>
					<div>{mealData.to}</div>
				</div>
			);
		}
	};

	const getKjDailyGoal = (): ReactElement => {
		return (
			<div>
				{userPrefData.kjDailyGoal && userPrefData.kjDailyGoal > 0
					? userPrefData.kjDailyGoal
					: dailyKjMaintenance}
			</div>
		);
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<p>test</p>
			<div>{loading ? "LOADING" : getUserData()}</div>
			{getKjDailyGoal()}
		</div>
	);
}
