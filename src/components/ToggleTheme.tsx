import { useState, useEffect } from "react"
import { GiSun } from "react-icons/gi"
import { FaMoon } from "react-icons/fa"

export const ToggleTheme = () => {
    const savedTheme = localStorage.getItem("theme")

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
                className="flex items-center justify-center gap-1 size-7"
                aria-label={`Change theme ${selectedTheme === "light" ? "dark" : "light"}`}
            >
                {selectedTheme === "light" ? (
                    <GiSun className="size-5" />
                )
                    : (
                        <FaMoon className="size-5" />
                    )}
            </button>
        </>
    )
}

