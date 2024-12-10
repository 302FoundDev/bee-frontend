import { FaGithubAlt } from "react-icons/fa";
import { DropDownProfile } from "./DropDownProfile"
import { ToggleTheme } from "./ToggleTheme"
import { Link } from "react-router-dom"


export const Header = () => {

  return (
    <header className="text-white border-b bg-neutral-900 border-zinc-800">
      <nav className="h-16 px-4 m-auto max-w-screen-2xl">
        <ul className="flex items-center justify-between h-full">
          <li>
            <Link
              to="/"
              className="transition ease-in-out hover:opacity-70"
            >
              <span className="flex text-2xl font-semibold">bee</span>
            </Link>
          </li>

          <div className="flex items-center gap-4">
            <li>
              <a
                className="transition ease-in-out hover:opacity-80"
                target="_blank"
                rel="noopener"
                href="https://github.com/LaCocinaDePapa/beely"
              >
                <span className="flex items-center gap-2">
                  <FaGithubAlt className="flex size-5" />
                </span>
              </a>
            </li>

            <div>
              <ToggleTheme />
            </div>

            <li>
              <DropDownProfile />
            </li>

          </div>

        </ul>
      </nav>
    </header>
  )
}
