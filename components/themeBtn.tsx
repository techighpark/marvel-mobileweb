import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeBtn = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <div
          className=" w-fit rounded-sm bg-purple-600 px-2 py-[2px] flex justify-center items-center shadow-sm"
          role="button"
          onClick={() => setTheme("light")}
        >
          <span className="font-bold text-[8px] text-gray-100">Light Mode</span>
        </div>
      );
    } else {
      return (
        <div
          className=" w-fit rounded-sm bg-purple-600 px-2 py-[2px] flex justify-center items-center shadow-sm"
          role="button"
          onClick={() => setTheme("dark")}
        >
          <span className="font-bold text-[8px] text-gray-100 ">Dark Mode</span>
        </div>
      );
    }
  };

  return <div className="">{renderThemeChanger()}</div>;
};

export default ThemeBtn;
