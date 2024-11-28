import { useState, useEffect } from "react"
import { GiSun } from "react-icons/gi"
import { FaMoon } from "react-icons/fa"

export const ToggleTheme = () => {
    const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const savedTheme = localStorage.getItem("theme") || defaultTheme

    const [selectedTheme, setSelectedTheme] = useState(savedTheme || "light")

    const handleToggle = () => {
        const newTheme = selectedTheme === "light" ? "dark" : "light"
        setSelectedTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }

    useEffect(() => {
        document.body.classList.remove("light", "dark")
        document.body.classList.add(selectedTheme)
    }, [selectedTheme])

    return (
        <>
            <button
                onClick={handleToggle}
                className="flex items-center justify-center gap-1 size-7"
                    aria-label={`Change theme ${selectedTheme === "light" ? "dark" : "light"}`}
            >
                {selectedTheme === "light" ? (
                    <GiSun className="text-yellow-500 size-5" />
                )
                : (
                    <FaMoon className="text-yellow-400 size-5" />
                )}
            </button>
        </>
    )
}

