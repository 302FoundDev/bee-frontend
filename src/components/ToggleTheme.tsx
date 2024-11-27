import { useState, useEffect } from "react"
import { GiSun } from "react-icons/gi"
import { FaMoon } from "react-icons/fa"

export const ToggleTheme = () => {
    const savedTheme = localStorage.getItem("theme")

    const [selectedTheme, setSelectedTheme] = useState(savedTheme || "light")

    const handleToggle = () => {
        const newTheme = selectedTheme === "light" ? "dark" : "light"
        setSelectedTheme(newTheme)

        localStorage.setItem("theme", newTheme)
    }

    useEffect(() => {
        document.body.className = selectedTheme
    }, [selectedTheme])

    return (
        <>
            <button
                onClick={handleToggle}
                className="flex items-center justify-center gap-1 size-7"
            >
                {selectedTheme === "light" ? <GiSun className="text-yellow-500 size-5" /> : <FaMoon className="text-yellow-400 size-5" />}
            </button>
        </>
    )
}
