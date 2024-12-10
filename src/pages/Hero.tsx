import { FaSquareGithub } from "react-icons/fa6"
import { motion } from "framer-motion"

export const Hero = () => {

  return (
    <section className="px-4 text-white">
      <motion.div
        className="flex justify-center mt-20 sm:mt-40"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "linear" }}
      >
        <h2 className="flex mb-8 text-5xl font-extrabold text-transparent sm:text-center text-start bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">
          Streamline Your URL Management with Bee
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "linear" }}
      >
        <p className="w-full mx-auto text-lg font-medium leading-6 text-neutral-950 sm:max-w-screen-xl dark:text-white sm:text-center">
          Bee is an open-source tool designed to simplify the creation, organization, and tracking of URLs.
          With an intuitive interface and powerful features, Bee allows you to manage links efficiently,
          saving time and enhancing the analysis of your URLs' performance. Streamline your URL management
          with Bee and take control of your links to the next level.
        </p>

        <article className="mx-auto mt-10">
          <a
            href="https://github.com/302FoundDev/bee-frontend"
            rel="noopener"
            target="_blank"
            className="flex items-center justify-center w-full gap-2 py-2 mx-auto text-base transition bg-blue-700 rounded-lg sm:text-lg sm:hover:scale-105 sm:max-w-48 hover:bg-blue-800"
          >
            <FaSquareGithub />
            Star on GitHub
          </a>
        </article>
      </motion.div>
    </section>
  )
}
