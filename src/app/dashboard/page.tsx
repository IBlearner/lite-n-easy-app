"use client";
import { ReactElement, useEffect, useState } from "react";
import { IUserData, IUserPrefs, IUserProfile } from "@/common/interfaces";
import { dailyKjMaintenance } from "@/common/constants";
import Image from "next/image";

export default function Dashboard() {
	const [user, setUser] = useState<string>("");
	const [userProfileData, setUserProfileData] = useState<IUserProfile>({
		name: "",
		age: 0,
		country: "",
		picture: "",
		dateJoined: ""
	});
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
			const foundUser = localStorage.getItem("user") ?? "";
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

		// Fetch the user details
		fetch("/userProfile.json")
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					// console.log(data);
					setUserProfileData(data);
				} else {
					setError("Cannot fetch user preferences");
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

	// FUNCTIONS FOR USER DATA
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

	const getProfilePic = (): ReactElement => {
		const imgUrl = userProfileData.picture !== "" ? userProfileData.picture : "/prof-pic-default.jpg";
		return (
			<Image
				className="w-16 h-16 rounded-full"
				src={imgUrl}
				alt="Profile picture"
				width={160}
				height={160}
				placeholder="empty"
			/>
		);
	};

	// FUNCTIONS FOR KJ
	const getKjCurrentConsumed = (): number => {
		return 1234;
	};

	const getKjDailyGoal = (): number => {
		return userPrefData.kjDailyGoal && userPrefData.kjDailyGoal > 0 ? userPrefData.kjDailyGoal : dailyKjMaintenance;
	};

	const getKjRemainingDaily = (): number => {
		return getKjDailyGoal() - getKjCurrentConsumed();
	};

	const getKjComponent = (): ReactElement => {
		return (
			<div>
				{getKjCurrentConsumed()}kj consumed out of {getKjDailyGoal()}kj
				<div>{getKjRemainingDaily()} kj left for the day</div>
			</div>
		);
	};

	// FUNCTIONS FOR TODAYS MENU
	const getTodaysMenuComponent = (): ReactElement => {
		return (
			<div className="w-full border border-solid border-black/[.08] dark:border-white/[.145]">
				<div className="w-full items-center px-4 py-2 text-white">
					<div className="flex flex-col">
						<span>Breakfast</span>
						<div className="flex flex-row justify-between px-6 italic">
							<span className="text-grey">Cereal with apple</span>
							<span className="text-blue-600 dark:text-sky-400">1800kj</span>
						</div>
					</div>
				</div>
				<div className="w-full items-center px-4 py-2 text-white">
					<div className="flex flex-col">
						<span>Lunch</span>
						<div className="flex flex-row justify-between px-6 italic">
							<span className="text-grey">Greek salad</span>
							<span className="text-blue-600 dark:text-sky-400">759kj</span>
						</div>
					</div>
				</div>
				<div className="w-full items-center px-4 py-2 text-white">
					<div className="flex flex-col">
						<span>Dinner</span>
						<div className="flex flex-row justify-between px-6 italic">
							<span className="text-grey">Steak diane</span>
							<span className="text-blue-600 dark:text-sky-400">2100kj</span>
						</div>
					</div>
				</div>
				<div className="w-full items-center px-4 py-2 text-white">
					<div className="flex flex-col">
						<span>Snacks</span>
						<div className="flex flex-row justify-between px-6 italic">
							<span className="text-grey">Oranges</span>
							<span className="text-blue-600 dark:text-sky-400">201kj</span>
							<span className="text-grey">Pear</span>
							<span className="text-blue-600 dark:text-sky-400">301kj</span>
							<span className="text-grey">Popcorn</span>
							<span className="text-blue-600 dark:text-sky-400">241kj</span>
						</div>
					</div>
				</div>
			</div>
		);
	};
	return (
		<div className="flex flex-col items-center justify-items-center min-h-screen pt-2 px-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			{getProfilePic()}
			<h1 className="text-3xl">Welcome {user}</h1>
			{getKjComponent()}
			<h2 className="text-2xl">Today&apos;s Menu</h2>
			<div>MODIFY</div>
			{getTodaysMenuComponent()}
			<div>{loading ? "LOADING" : getUserData()}</div>
		</div>
	);
}
