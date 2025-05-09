import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        let initialTheme: "light" | "dark" = "light";

        if (storedTheme === "dark" || storedTheme === "light") {
            initialTheme = storedTheme;
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            initialTheme = "dark";
        }

        setTheme(initialTheme);

        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem("theme", initialTheme);
    }, []);

    const handleToggleClick = () => {
        const element = document.documentElement;
        element.classList.add("disable-transitions");
        element.classList.toggle("dark");

        // Force reflow to apply transition
        void window.getComputedStyle(element).getPropertyValue("opacity");

        requestAnimationFrame(() => {
            element.classList.remove("disable-transitions");
        });

        const isDark = element.classList.contains("dark");
        setTheme(isDark ? "dark" : "light");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    return (
        <Button
            variant="outline"
            size="icon"
            title="Toggle theme"
            onClick={handleToggleClick}
        >
            <Sun
                className={`size-4 text-neutral-500 scale-100 rotate-0 transition-all ${theme === "dark" ? "scale-0 -rotate-90" : ""
                    }`}
            />
            <Moon
                className={`absolute text-neutral-500 size-4 scale-0 rotate-90 transition-all ${theme === "dark" ? "scale-100 rotate-0" : ""
                    }`}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
