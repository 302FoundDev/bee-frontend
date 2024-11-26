import { useState, useEffect } from "react"
import { GiSun } from "react-icons/gi"
import { FaMoon } from "react-icons/fa"

export const ToggleTheme = () => {
    const savedTheme = localStorage.getItem("theme")

    const [selectedTheme, setSelectedTheme] = useState(savedTheme || "light")

    const handleChange = (event) => {
        const newTheme = event.target.value
        setSelectedTheme(newTheme)

        localStorage.setItem("theme", newTheme)
    }

    useEffect(() => {
        document.body.className = selectedTheme
    }, [selectedTheme])

    return (
        <>
            <button
                onClick={()=>handleChange({target: {value: selectedTheme === "light" ? "dark" : "light"}})}
                className="flex items-center gap-1 size-7"
            >
                {selectedTheme === "light" ? <FaMoon className="text-yellow-500 size-5" /> : <GiSun className="text-yellow-400 size-5" />}
            </button>
        </>
    )
}
