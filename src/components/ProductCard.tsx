import { Product } from '@/types/product'
import { motion } from 'framer-motion'
import { ParallaxCard } from './ParallaxCard'
import { TryOnButton } from './TryOnButton'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <ParallaxCard className="group relative bg-[#111111] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-redora-red text-white text-[10px] px-3 py-1.5 tracking-widest uppercase font-medium">
              -{discount}%
            </span>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <motion.button
              className="bg-white text-black text-xs tracking-widest uppercase px-6 py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Quick View
            </motion.button>
            <TryOnButton productId={product.id} className="!px-4 !py-3 !text-[10px]" />
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-sm text-white/70 line-clamp-2 mb-3 tracking-wide leading-relaxed group-hover:text-white transition-colors duration-300">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-lg font-medium text-white">${product.price.toFixed(2)}</span>
            <span className="text-sm text-white/30 line-through">${product.originalPrice.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-white/40">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-redora-red" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{product.rating}</span>
            </div>
            <span className="tracking-wider">{product.soldCount.toLocaleString()} sold</span>
          </div>
        </div>

        <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />
      </motion.div>
    </ParallaxCard>
  )
}
