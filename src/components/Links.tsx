import { CreateSlugModal } from "../components/CreateLinkModal"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import Loading from "./Loading"
import { IoMdClose } from "react-icons/io"
import { FiCopy } from "react-icons/fi";


export const Links = () => {
  const { user, isLoading } = useAuth()

  const createLink = 'Create link'
  const createNewSlug = 'Create new slug'

  if (isLoading) {
    return (
      <>
        <Loading />
        <p className="mt-2">Loading...</p>
      </>
    )
  }

  return (
    <main className="w-full px-4 mx-auto text-black max-w-screen-2xl dark:text-white">

      {
        <motion.div
          className="flex flex-col w-full gap-6 mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "linear" }}
        >
          <div className="flex items-start justify-between w-full">
            <h1 className="text-xl font-semibold">
              Welcome back, <span className="bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">{user?.full_name}</span>
            </h1>

            <div>
              <CreateSlugModal children={createLink} />
            </div>
          </div>

          {
            user?.urls.length === 0 ? (
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
                  <CreateSlugModal children={createNewSlug} />
                </div>
              </div>
            ) : (
              <div className="grid items-center grid-cols-1 gap-3 sm:grid-cols-3">
                {user?.urls.map((url) => (
                  <li key={url.id} className="flex flex-col justify-between w-full gap-2 px-4 py-4 border rounded-lg shadow-sm dark:bg-transparent bg-neutral-100 h-22 border-zinc-300 dark:border-zinc-800">
                    <div className="flex justify-between">
                      <p className="text-base font-medium">/{url.slug}</p>
                      <div className="flex gap-2 text-sm">
                        <button onClick={() => { alert('Clicked') }} className="cursor-default" type="button">
                          <FiCopy />
                        </button>
                        <button onClick={() => { alert('Clicked') }} className="cursor-default" type="button">
                          <IoMdClose />
                        </button>
                      </div>
                    </div>
                    <p className="text-base opacity-60">{url.url}</p>
                  </li>
                ))}
              </div>
            )
          }

        </motion.div>
      }
    </main>
  )
}
