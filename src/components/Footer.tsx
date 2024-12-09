import { FaSquareXTwitter, FaLink, FaHeart } from "react-icons/fa6"

export const Footer = () => {

  return (
    <footer className="px-4 py-4 text-white w-fullmx-auto bg-neutral-900 border-zinc-800">
      <section className="flex flex-col justify-between gap-2 mx-auto max-w-screen-2xl lg:flex-row md:flex-row">
        <div className="inline-flex items-center gap-1">
          Made with <span className="text-red-600"><FaHeart /></span> by <a className="hover:underline hover:opacity-85" href="https://github.com/LaCocinaDePapa" target='_blank' rel='noopener noreferer'>LaCocinaDePapa</a>
        </div>
        <div className="flex gap-1.5">
          © 2024
          <a
            href="https://302foundev.es"
            className="hover:underline hover:opacity-85"
            rel="noopener"
            target="_blank"
          >
            302foundev.
          </a>
          Almost all rights reserved
        </div>
        <div>
          <a
            className="flex w-24"
            href="https://x.com/302founddev"
            rel="noopener"
            target="_blank"
          >
            <span className="flex items-center gap-1 hover:opacity-75">
              <FaSquareXTwitter />
              Twitter
              <FaLink />
            </span>
          </a>
        </div>
      </section>
    </footer>
  )
}
