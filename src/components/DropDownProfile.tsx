import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

export const DropDownProfile = () => {
  const { isAuthenticated } = useAuth();
  const [isDropOpen, setIsDropOpen] = useState(false)

  const openDrop = () => {
    setIsDropOpen(!isDropOpen)
  }

  const closeDrop = () => {
    setIsDropOpen(false)
  }

  const links = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Settings", to: "/dashboard/settings" },
    { name: "Sign out", to: "/signout" }
  ]

  return (
    <>
      {
        !isAuthenticated ? (
          <div className="z-10 rounded-full size-8">
            <button onClick={openDrop}>
              <img
                className="w-8 h-8 rounded-full cursor-pointer"
                src="https://flowbite-react.com/images/people/profile-picture-5.jpg"
              />
            </button>

            {
              isDropOpen && (
                <div className="absolute z-20 w-44 py-2 mt-2 transition ease-in-out bg-white dark:bg-black dark:border-zinc-800 rounded-lg shadow-xl right-[32rem] top-16">
                  {
                    links.map((link, index) => {
                      return (
                        <Link
                          key={index}
                          to={link.to}
                          onClick={closeDrop}
                          className="block px-4 py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                        >
                          {link.name}
                        </Link>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        ) : (
          <Link
            to="signin"
            className="flex items-center gap-2 px-6 py-1.5 font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full"
          >
            Get started
            <FaArrowRight className="w-3" />
          </Link>
        )
      }
    </>
  )
}

