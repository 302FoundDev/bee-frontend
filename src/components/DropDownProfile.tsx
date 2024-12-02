import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";



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
    { icon: <MdOutlineDashboard />, name: "Dashboard", to: "/dashboard" },
    { icon: <IoSettingsOutline />, name: "Settings", to: "/dashboard/settings" },
    { icon: <IoMdLogOut />, name: "Sign out", to: "/signout" }
  ]

  return (
    <>
      {
        isAuthenticated && isAuthenticated ? (
          <div className="relative flex">
            <button onClick={openDrop}>
              <img
                className="relative z-10 rounded-full size-8"
                src="https://flowbite-react.com/images/people/profile-picture-5.jpg"
              />
            </button>

            {
              isDropOpen && (
                <div onClick={closeDrop} className="fixed inset-0 z-0"></div>
              )
            }

            {
              isDropOpen && (
                <div className="absolute left-0 z-20 w-40 px-2 py-2 mt-2 transition-all ease-in-out bg-white rounded-md shadow-lg top-8 dark:bg-black/50 dark:border-zinc-800">
                  {
                    links.map((link, index) => {
                      return (
                        <Link
                          key={index}
                          to={link.to}
                          onClick={closeDrop}
                          className="flex cursor-default gap-1.5 items-center px-4 py-2 text-sm font-semibold rounded text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-slate-800 hover:text-neutral-900 dark:hover:text-neutral-100"
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

