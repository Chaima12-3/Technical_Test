"use client"; 

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);


  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button variant="outline" size="icon">

      {isDarkMode ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" onClick={toggleTheme} />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" onClick={toggleTheme} />
      )}
    </Button>
  );
}