import { useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LenisProvider } from '@/components/LenisProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { TryOnUpload } from '@/components/TryOnUpload'
import { TryOnResult } from '@/components/TryOnResult'
import { mockTryOn } from '@/services/mockTryOn'
import { products } from '@/data/products'

type TryOnStep = 'upload' | 'processing' | 'result'

export function TryOnPage() {
  const { productId } = useParams<{ productId: string }>()
  const [step, setStep] = useState<TryOnStep>('upload')
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const product = products.find((p) => p.id === productId)

  const handleImageSelect = useCallback(
    async (file: File) => {
      setStep('processing')
      setError(null)

      const garmentUrl = product?.image || 'https://picsum.photos/seed/default/400/400'

      try {
        const result = await mockTryOn(file, garmentUrl)

        if (result.success && result.resultUrl) {
          setResultUrl(result.resultUrl)
          setStep('result')
        } else {
          setError(result.error || 'Failed to generate try-on')
          setStep('upload')
        }
      } catch {
        setError('Something went wrong. Please try again.')
        setStep('upload')
      }
    },
    [product]
  )

  const handleReset = () => {
    setStep('upload')
    setResultUrl(null)
    setError(null)
  }

  return (
    <LenisProvider>
      <main className="bg-[#0a0a0a] min-h-screen">
        <Navbar />

        <div className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Link
                to="/"
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                ← Back to Shop
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-white mt-8 mb-4">
                Virtual <span className="text-redora-red italic">Try-On</span>
              </h1>
              <p className="text-white/50 text-lg">
                Upload your photo to see how this piece looks on you
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="sticky top-32">
                  <span className="text-redora-red text-xs tracking-[0.3em] uppercase block mb-4">
                    Selected Item
                  </span>

                  {product ? (
                    <div className="border border-white/10 p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-square object-cover mb-4"
                      />
                      <h3 className="text-white font-medium mb-2">
                        {product.name}
                      </h3>
                      <p className="text-redora-red text-xl font-bold">
                        ${product.price}
                      </p>
                    </div>
                  ) : (
                    <div className="border border-white/10 p-4">
                      <div className="w-full aspect-square bg-white/5 flex items-center justify-center">
                        <span className="text-white/30">No product selected</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-redora-red text-xs tracking-[0.3em] uppercase block mb-4">
                  Your Photo
                </span>

                {step === 'processing' ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full aspect-[4/5] border border-white/10 rounded-lg flex flex-col items-center justify-center gap-6"
                  >
                    <div className="w-16 h-16 border-2 border-redora-red border-t-transparent rounded-full animate-spin" />
                    <div className="text-center">
                      <p className="text-white text-lg">Generating your try-on...</p>
                      <p className="text-white/40 text-sm mt-2">
                        This may take a few seconds
                      </p>
                    </div>
                  </motion.div>
                ) : step === 'result' && resultUrl ? (
                  <TryOnResult resultUrl={resultUrl} onReset={handleReset} />
                ) : (
                  <>
                    <TryOnUpload onImageSelect={handleImageSelect} />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-4"
                      >
                        {error}
                      </motion.p>
                    )}
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </LenisProvider>
  )
}
