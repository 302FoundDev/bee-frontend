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
        <h1 className="text-[30px] font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 md:text-[47px] lg:text-[60px]">
          Streamline Your URL Management
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "linear" }}
      >
        <p className="flex w-full mx-auto text-lg leading-6 text-center text-black md:max-w-4xl lg:max-w-4xl dark:text-white">
          BeeURL is a comprehensive, open-source tool specifically crafted to
          transform the way you handle links by providing a seamless and
          efficient approach to creating, organizing, and tracking URLs
        </p>

        <article className="pt-10 mx-auto">
          <a
            href="https://github.com/302FoundDev/bee-frontend"
            rel="noopener"
            target="_blank"
            className="flex items-center justify-center gap-2 py-2 mx-auto text-base font-medium transition bg-blue-700 rounded-lg hover:scale-105 max-w-48 hover:bg-blue-800"
          >
            <FaSquareGithub className="size-5" />
            Star on GitHub
          </a>
        </article>
      </motion.div>
    </section>
  )
}
