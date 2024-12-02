import { LoaderIcon } from "lucide-react"

const Loading = () => {
  return (
    <div className="flex flex-col items-center w-full duration-100 mt-14 text-neutral-500 animate-in fade-in-20 dark:text-neutral-400">
      <LoaderIcon size={20} className="animate-spin" />
    </div>
  )
}

export default Loading
