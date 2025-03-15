import { Settings, Menu } from "lucide-react";

export default function Navbar() {
	return (
		<nav className="flex flex-row justify-between pt-4 px-4">
			<Settings size={32} />
			<Menu size={32} />
		</nav>
	);
}
