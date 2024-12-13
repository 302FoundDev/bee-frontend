import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa"
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import Loading from "./Loading";


export const DropDownProfile = () => {
  const { isAuthenticated, isLoading, signout, user } = useAuth();
  const [isDropOpen, setIsDropOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrop()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

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
  ]

  const handleSignOut = async () => {
    try {
      await signout();
    } catch (error) {
      console.error("Error while signing out:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {isAuthenticated ? (
        <div className="relative flex">
          <button className="relative z-10" onClick={openDrop}>
            <FaUserCircle className="size-7" />
          </button>

          {isDropOpen && (<div onClick={closeDrop} className="fixed inset-0 z-0"></div>)}

          {
            isDropOpen && (
              <div className="absolute right-0 z-20 w-60 px-2 py-2 mt-2 transition-all ease-in-out bg-white rounded-md shadow-lg top-[85%] left-2/2 dark:bg-black/95 dark:border-zinc-800">
                <p className="flex items-center px-4 text-[15px] text-neutral-900 font-semibold dark:text-neutral-100">{user?.full_name}</p>
                <p className="flex items-center px-4 mb-4 text-sm opacity-75 text-neutral-900 dark:text-neutral-100">{user?.email}</p>

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

                <button onClick={handleSignOut} className="flex w-full cursor-default gap-1.5 items-center px-4 py-2 text-sm font-semibold rounded text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-slate-800 hover:text-neutral-900 dark:hover:text-neutral-100" type="button"><IoMdLogOut /> Sign out</button>

              </div>
            )
          }
        </div>
      ) : (
        <Link
          to="signin"
          className="flex items-center transition ease-in-out gap-2 text-sm px-4 py-1.5 font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-lg hover:scale-105"
        >
          Get started
        </Link>
      )}
    </>
  )
}

