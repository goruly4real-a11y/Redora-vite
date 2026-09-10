import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LenisProvider } from '@/components/LenisProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductInfo } from '@/components/ProductInfo'
import { DeliveryInfo } from '@/components/DeliveryInfo'
import { ReviewsSection } from '@/components/ReviewsSection'
import { RelatedProducts } from '@/components/RelatedProducts'
import { allProducts } from '@/data/products'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = allProducts.find((p) => p.id === id)

  if (!product) {
    return (
      <LenisProvider>
        <main className="bg-[#0a0a0a] min-h-screen">
          <Navbar />
          <div className="pt-32 pb-16 px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-white/50 mb-8">The product you are looking for does not exist.</p>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-redora-red text-white text-sm tracking-widest uppercase hover:bg-redora-red/90 transition-colors"
            >
              Back to Shop
            </Link>
          </div>
          <Footer />
        </main>
      </LenisProvider>
    )
  }

  return (
    <LenisProvider>
      <main className="bg-[#0a0a0a] min-h-screen">
        <Navbar />

        <div className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link
                to="/"
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                ← Back to Shop
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProductGallery images={product.images} productName={product.name} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ProductInfo product={product} />
                <div className="mt-8">
                  <DeliveryInfo delivery={product.delivery} price={product.price} />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <ReviewsSection
                reviews={product.reviews}
                rating={product.rating}
                soldCount={product.soldCount}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <RelatedProducts currentProduct={product} allProducts={allProducts} />
            </motion.div>
          </div>
        </div>

        <Footer />
      </main>
    </LenisProvider>
  )
}
