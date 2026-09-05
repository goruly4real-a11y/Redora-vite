import { motion } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { CountdownTimer } from './CountdownTimer'
import { products } from '@/data/products'

export function FlashDeals() {
  const dealEndTime = Date.now() + 4 * 60 * 60 * 1000

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6 md:mb-0">
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-px bg-redora-red/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-redora-red">Limited Time</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-light text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Flash Deals
          </motion.h2>
        </div>
        
        <div className="flex items-center gap-6">
          <CountdownTimer targetDate={dealEndTime} />
          
          <motion.a 
            href="#"
            className="text-white/50 hover:text-white text-sm tracking-widest uppercase transition-colors duration-300 flex items-center gap-2"
            whileHover={{ x: 5 }}
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.slice(0, 4).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
