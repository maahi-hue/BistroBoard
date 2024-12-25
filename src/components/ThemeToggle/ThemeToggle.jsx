import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="btn bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeToggle;
