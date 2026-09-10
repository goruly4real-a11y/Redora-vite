import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Product } from '@/types/product'

interface RelatedProductsProps {
  currentProduct: Product
  allProducts: Product[]
}

export function RelatedProducts({ currentProduct, allProducts }: RelatedProductsProps) {
  const related = allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category || p.isFashion === currentProduct.isFashion)
    )
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          You May Also Like
        </h2>
        <p className="text-white/50 text-sm">
          Similar products you might be interested in
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/product/${product.id}`}
              className="group block border border-white/10 hover:border-white/20 transition-colors duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-redora-red text-xs tracking-wider uppercase mb-1">
                  {product.brand}
                </p>
                <h3 className="text-white text-sm line-clamp-2 mb-2 group-hover:text-redora-red transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">${product.price.toFixed(2)}</span>
                  <span className="text-white/30 text-xs line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
