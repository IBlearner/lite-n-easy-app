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

export interface IUserPrefs {
	targetWeight: number;
	kjDailyGoal: number;
	proteinDailyGoal: number;
	stepsDailyGoal: number;
	exerciseWeeklyGoal: number;
	exerciseDailyGoal: number;
}
