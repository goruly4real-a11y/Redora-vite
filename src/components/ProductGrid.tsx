import { motion } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { products } from '@/data/products'

export function ProductGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-16">
        <motion.div 
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-redora-red/50" />
          <span className="text-xs tracking-[0.3em] uppercase text-redora-red">Collection</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-redora-red/50" />
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-5xl font-light text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Products
        </motion.h2>
        
        <motion.p 
          className="text-white/40 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Curated selections for the discerning customer
        </motion.p>
      </div>
      
      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
