import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineDashboard } from "react-icons/md";


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
    { icon: <TiHomeOutline />, name: "Home", to: "/" },
    {  icon: <MdOutlineDashboard />, name: "Dashboard", to: "/dashboard" },
    { icon: <IoSettingsOutline />, name: "Settings", to: "/dashboard/settings" },
    { icon: <FaArrowRight />, name: "Sign out", to: "/signout" }
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
                <div onClick={closeDrop} className="fixed inset-0 z-10"></div>
              )
            }

            {
              isDropOpen && (
                <div className="absolute z-20 w-40 py-2 px-2 mt-2 transition scale-105 bg-white dark:bg-black/50 dark:border-zinc-800 rounded-md shadow-xl right-[33rem]">
                  {
                    links.map((link, index) => {
                      return (
                        <Link
                          key={index}
                          to={link.to}
                          onClick={closeDrop}
                          className="flex gap-1.5 items-center px-4 py-2 text-sm font-semibold rounded text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-slate-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                        >
                          {link.icon}{link.name}
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

