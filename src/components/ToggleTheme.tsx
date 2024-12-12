import { useState, useEffect } from "react"
import { LuSun } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";

export const ToggleTheme = () => {
    const savedTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    const [selectedTheme, setSelectedTheme] = useState(savedTheme || "dark")

    const handleToggle = () => {
        const newTheme = selectedTheme === "light" ? "dark" : "light"
        setSelectedTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(selectedTheme)
    }, [selectedTheme])

    return (
        <>
            <button
                onClick={handleToggle}
                className="flex items-center justify-center gap-1 p-1.5 transition duration-200 ease-in-out rounded-full hover:bg-zinc-800 hover:scale-105"
                aria-label={`Change theme ${selectedTheme === "light" ? "dark" : "light"}`}
            >
                {selectedTheme === "light" ? (
                    <LuSun className="size-4" />
                )
                    : (
                        <FaRegMoon className="size-4" />
                    )}
            </button>
        </>
    )
}

