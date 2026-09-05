import { motion } from 'framer-motion'
import { CategoryIcon } from './SVG/CategoryIcons'

const categories = [
  { name: 'Electronics', type: 'electronics' as const },
  { name: 'Fashion', type: 'fashion' as const },
  { name: 'Home & Garden', type: 'home' as const },
  { name: 'Sports', type: 'sports' as const },
  { name: 'Beauty', type: 'beauty' as const },
  { name: 'Toys', type: 'toys' as const },
]

export function CategorySection() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-redora-red/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-redora-red">Browse</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-redora-red/50" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-light text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Shop by Category
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.name}
              href="#"
              className="group flex flex-col items-center gap-5 p-6 bg-[#111111] border border-white/5 hover:border-redora-red/30 transition-all duration-500 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-redora-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <CategoryIcon type={category.type} />
              </div>
              
              <span className="relative z-10 text-xs text-white/50 tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                {category.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
