export interface IUserData {
	from: string;
	to: string;
	data: {
		id: number;
		date: string;
		session: string;
		kj: number;
		protein: number;
	};
}

export interface IUserProfile {
	name: string;
	age: number;
	country: string;
	picture: string;
	dateJoined: string;
}

export interface IUserPrefs {
	targetWeight: number;
	kjDailyGoal: number;
	proteinDailyGoal: number;
	stepsDailyGoal: number;
	exerciseWeeklyGoal: number;
	exerciseDailyGoal: number;
}
