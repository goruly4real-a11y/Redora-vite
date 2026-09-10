const MOCK_RESULTS = [
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600',
]

export interface TryOnResult {
  success: boolean
  resultUrl?: string
  error?: string
}

export async function mockTryOn(
  _userImage: File,
  garmentImageUrl: string
): Promise<TryOnResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const randomIndex = Math.floor(Math.random() * MOCK_RESULTS.length)
  const resultUrl = MOCK_RESULTS[randomIndex]

  return {
    success: true,
    resultUrl,
  }
}

export async function tryOnWithApi(
  userImage: File,
  garmentImageUrl: string,
  apiKey?: string
): Promise<TryOnResult> {
  if (!apiKey) {
    return mockTryOn(userImage, garmentImageUrl)
  }

  try {
    const formData = new FormData()
    formData.append('user_image', userImage)
    formData.append('product_image_url', garmentImageUrl)

    const response = await fetch('/api/tryon', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Try-on failed')
    }

    const data = await response.json()
    return {
      success: true,
      resultUrl: data.resultUrl,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
