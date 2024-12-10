import { FaSquareGithub } from "react-icons/fa6"
import { motion } from "framer-motion"

export const Hero = () => {

  return (
    <section className="px-8 text-white">
      <motion.div
        className="flex justify-center mt-16 md:mb-7 lg:mt-40 md:mt-32"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "linear" }}
      >
        <span className="block text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">
          Streamline Your URL Management with Bee
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "linear" }}
      >
        <p className="w-full mx-auto text-lg text-center text-black text-pretty md:max-w-4xl lg:max-w-4xl dark:text-white">
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
            className="flex items-center justify-center gap-2 py-2 mx-auto text-base font-medium transition bg-blue-700 rounded-lg hover:scale-105 max-w-48 hover:bg-blue-800"
          >
            <FaSquareGithub />
            Star on GitHub
          </a>
        </article>
      </motion.div>
    </section>
  )
}
