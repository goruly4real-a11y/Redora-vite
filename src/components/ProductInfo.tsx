import { motion } from 'framer-motion'
import { Product } from '@/types/product'
import { TryOnButton } from './TryOnButton'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <p className="text-redora-red text-xs tracking-[0.3em] uppercase mb-3">
          {product.brand}
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-redora-red' : 'text-white/20'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-white/50 text-sm ml-2">
              {product.rating} ({product.soldCount.toLocaleString()} sold)
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-4xl font-bold text-white">${product.price.toFixed(2)}</span>
          <span className="text-lg text-white/30 line-through">${product.originalPrice.toFixed(2)}</span>
          <span className="bg-redora-red text-white text-xs px-3 py-1.5 tracking-wider">
            -{discount}%
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <p className="text-white/60 leading-relaxed">
          {product.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h3 className="text-white text-sm tracking-widest uppercase mb-4">
          Features
        </h3>
        <ul className="space-y-3">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-white/60">
              <svg className="w-4 h-4 text-redora-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-4"
      >
        <button className="w-full py-4 bg-redora-red text-white text-sm tracking-widest uppercase hover:bg-redora-red/90 transition-colors">
          Add to Cart
        </button>

        {product.isFashion && (
          <TryOnButton productId={product.id} className="w-full" />
        )}
      </motion.div>
    </div>
  )
}
