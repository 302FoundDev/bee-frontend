import { CreateSlugModal } from "../components/CreateLinkModal"
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
            className="flex flex-col w-full gap-6 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "linear" }}
          >
            <div className="flex items-start justify-start w-full">
              <h1 className="text-2xl font-semibold">
                Welcome back, <span className="bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">{user?.full_name}</span> !
              </h1>
            </div>

            // fix the ternary operator

            {
              user ? (
                <CreateSlugModal />
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
                    <CreateSlugModal />
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

