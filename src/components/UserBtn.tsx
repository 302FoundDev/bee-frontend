import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaArrowRight } from "react-icons/fa6";

function UserBtn() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {
        !isAuthenticated ? (
          <div className="z-10 rounded-full size-8">
            <img
            className="w-8 h-8 rounded-full cursor-pointer"
              src="https://flowbite-react.com/images/people/profile-picture-5.jpg"
            />
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

export default UserBtn;
