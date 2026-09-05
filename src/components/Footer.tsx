import { motion } from 'framer-motion'

const footerLinks = {
  'Customer Service': ['Help Center', 'How to Buy', 'Returns & Refunds', 'Contact Us'],
  'About Redora': ['About Us', 'Careers', 'Affiliate Program', 'Press'],
  'Payment Methods': ['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay'],
  'Follow Us': ['Facebook', 'Twitter', 'Instagram', 'YouTube'],
}

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter section */}
        <motion.div 
          className="text-center mb-20 pb-20 border-b border-white/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
            Stay in the Loop
          </h3>
          <p className="text-white/40 mb-8 tracking-wider">
            Subscribe for exclusive offers and early access
          </p>
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm tracking-wider focus:outline-none focus:border-redora-red/50 transition-colors"
            />
            <motion.button 
              className="px-8 py-4 bg-redora-red text-white text-sm tracking-widest uppercase hover:bg-redora-red-dark transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-xs tracking-[0.2em] uppercase text-white mb-6">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/40 hover:text-white text-sm transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-lg font-semibold tracking-[0.15em] text-white">REDORA</span>
            <span className="text-white/20">|</span>
            <span className="text-white/30 text-sm">You&apos;ve seen the rest, now shop the best</span>
          </motion.div>
          
          <p className="text-white/20 text-sm tracking-wider">
            © 2026 Redora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
