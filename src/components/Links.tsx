import { Modal } from "../components/CreateLinkModal"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import Loading from "./Loading"

export const Links = () => {
  const { user, isLoading } = useAuth()

  return (
    <main className="mx-auto text-black max-w-screen-2xl dark:text-white">
      {
        isLoading ? (
          <>
            <Loading />
            <p className="mt-2">Loading...</p>
          </>
        ) : (
          <motion.div
            className="flex flex-col gap-6 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "linear" }}
          >
            <div>
              <h1 className="text-2xl font-semibold text-center">
                Welcome back, <span className="bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">user</span>!
              </h1>
            </div>

            // fix the ternary operator

            {
              user ? (
                <Modal />
              ) : (
                <div className="flex flex-col items-center mt-16">
                  <div>
                    <img
                      src="/empty-box.svg"
                      className="mx-auto size-14"
                      alt="empty box"
                    />
                    <p className="mt-2 mb-4 opacity-50">No links shortened, yet...</p>
                  </div>

                  <div>
                    <Modal />
                  </div>
                </div>
              )
            }

          </motion.div>
        )
      }
    </main>
  )
}

