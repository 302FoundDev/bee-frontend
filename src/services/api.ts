export const createSlug = async (originalUrl: string, slug: string, description: string) => {
  try {
    const response = await fetch('http://localhost:9000/urls/create-slug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ originalUrl, slug, description })
    })

    if (!response.ok) {
      throw new Error('Failed to create slug')
    }

    return await response.json()

  } catch (error) {
    throw new Error(`Error shortening URL: ${error}`)
  }
}
