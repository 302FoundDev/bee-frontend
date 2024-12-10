import { useState } from "react"
import { Button } from "../components/ui/Button"
import { IoMdClose } from "react-icons/io"
import { MdRocketLaunch } from "react-icons/md"
import { motion } from "framer-motion"
import { createSlug } from "../services/api"
import Confetti from 'react-confetti-boom'


export const CreateSlugModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false);

  if (showConfetti) {
    return <Confetti mode="fall" particleCount={50} colors={['#ff577f', '#ff884b']} />;
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const url = formData.get('url') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await createSlug(url, slug, description)
      setSuccess("Link created successfully!")
      setShowConfetti(true)
      return response
    }

    catch (error) {
      setError("Failed to create slug. Please try again.")
    }

    finally {
      setLoading(false)
      setShowConfetti(false)
    }
  }

  return (
    <section className="flex flex-col items-center">

      <Button
        className="w-48 inline-flex items-center gap-1.5 border-neutral-300 dark:border-neutral-800"
        variant="secondary"
        onClick={openModal}
      >
        <img className="size-4" src="/plus.svg" alt="plus icon" />
        Create new slug
      </Button>

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-10 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeModal}
        >
          <div
            className="absolute inset-0 backdrop-blur-xs"
            style={{ background: 'rgba(0, 0, 0, .1)' }}
          />
        </motion.div>
      )}

      {isModalOpen && (
        <motion.div
          className="mt-18 w-80 border rounded-md h-[480px] lg:w-[470px] p-4 bg-white dark:bg-black border-neutral-300 dark:border-neutral-800 z-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-12">
            <h3>Create a new link: </h3>
            <button onClick={closeModal} type="button">
              <IoMdClose />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="flex flex-col mb-6 text-[15px] text-black dark:text-gray-200">
              Destination URL:
              <input
                name="url"
                type="text"
                placeholder="https://example.com"
                className="px-4 py-2 mt-1 border rounded-md bg-slate-200/70 placeholder:text-black border-neutral-300 dark:border-neutral-800"
              />
            </label>
            <label className="flex flex-col text-[15px] mb-6 text-black dark:text-gray-200">
              Short link (optional):
              <input
                name="slug"
                type="text"
                placeholder="yourCustomLink"
                className="px-4 py-2 mt-1 border rounded-md bg-slate-200/70 placeholder:text-black border-neutral-300 dark:border-neutral-800"
              />
            </label>

            <label className="text-[15px] text-black dark:text-gray-200">
              Description:
              <textarea
                name="description"
                className="w-full h-20 px-4 py-2 mt-1 overflow-auto border rounded-md bg-slate-200/70 placeholder:text-black border-neutral-300 dark:border-neutral-800"
                placeholder="Enter a description"
              />
            </label>

            <div className="inline-flex items-end justify-end w-full gap-2 mt-8">
              <Button
                onClick={closeModal}
                variant="secondary"
                className="w-24 border border-neutral-300 dark:border-neutral-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="inline-flex items-center gap-1 border w-28 border-neutral-300 dark:border-neutral-800"
                variant="secondary"
                disabled={loading} // Deshabilitar el botón durante la carga
              >
                {loading ? (
                  <span className="loader"></span> // Puedes mostrar un spinner aquí
                ) : (
                  <>
                    <MdRocketLaunch />
                    Create
                  </>
                )}
              </Button>
            </div>
          </form>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </motion.div>
      )}
    </section>
  )
}
