import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Image
      src={
        theme === "light" ? "/assets/icons/moon.svg" : "/assets/icons/sun.svg"
      }
      alt={theme === "light" ? "moon icon" : "sun icon"}
      width={20}
      height={20}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    ></Image>
  );
};

export default ThemeSwitcher;
