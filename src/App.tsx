import { LenisProvider } from './components/LenisProvider'
import { CinematicHero } from './components/CinematicHero'
import { ParallaxSection } from './components/ParallaxSection'
import { ScrollReveal } from './components/ScrollReveal'
import { HorizontalScroll } from './components/HorizontalScroll'
import { ProductCard } from './components/ProductCard'
import { products } from './data/products'
import { Footer } from './components/Footer'

function App() {
  return (
    <LenisProvider>
      <main className="bg-[#0a0a0a] min-h-screen">
        <CinematicHero />

        <section className="relative py-32 px-4">
          <ParallaxSection speed={0.2}>
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-20">
                  <span className="text-redora-red text-sm tracking-[0.3em] uppercase block mb-4">
                    Featured Collection
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Curated for the{' '}
                    <span className="text-redora-red italic">Elite</span>
                  </h2>
                  <p className="text-white/50 max-w-2xl mx-auto text-lg">
                    Handpicked luxury pieces that define sophistication. Each item tells a story of craftsmanship and elegance.
                  </p>
                </div>
              </ScrollReveal>

              <HorizontalScroll className="gap-8 px-8">
                {products.map((product, index) => (
                  <ScrollReveal key={product.id} delay={index * 0.1}>
                    <div className="w-[350px] flex-shrink-0">
                      <ProductCard product={product} />
                    </div>
                  </ScrollReveal>
                ))}
              </HorizontalScroll>
            </div>
          </ParallaxSection>
        </section>

        <section className="relative py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />

          <ParallaxSection speed={0.15} className="relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <ScrollReveal direction="left">
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                        alt="Luxury Store"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-redora-red/30" />
                    <div className="absolute -top-8 -left-8 w-32 h-32 border border-white/10" />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right">
                  <div>
                    <span className="text-redora-red text-sm tracking-[0.3em] uppercase block mb-4">
                      Our Story
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                      Crafted with{' '}
                      <span className="text-redora-red italic">Passion</span>
                    </h2>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed">
                      Every piece in our collection is carefully selected to represent
                      the pinnacle of luxury and craftsmanship. We believe that true
                      elegance lies in the details.
                    </p>
                    <p className="text-white/60 text-lg mb-12 leading-relaxed">
                      From the finest materials to impeccable finishing, our commitment
                      to excellence is unwavering. Discover a world where quality
                      meets sophistication.
                    </p>
                    <button className="group relative px-8 py-4 bg-redora-red text-white uppercase tracking-widest text-sm overflow-hidden transition-all duration-500 hover:bg-redora-red/90">
                      <span className="relative z-10">Discover More</span>
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ParallaxSection>
        </section>

        <section className="relative py-32 px-4">
          <ParallaxSection speed={0.1}>
            <div className="max-w-5xl mx-auto text-center">
              <ScrollReveal>
                <span className="text-redora-red text-sm tracking-[0.3em] uppercase block mb-4">
                  Testimonials
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
                  What Our Clients Say
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    quote: 'The quality is unmatched. Every piece feels like a work of art.',
                    author: 'Sarah M.',
                    role: 'Fashion Enthusiast',
                  },
                  {
                    quote: 'Redora has redefined what luxury means to me. Simply exquisite.',
                    author: 'James L.',
                    role: 'Collector',
                  },
                  {
                    quote: 'From packaging to product, every detail speaks elegance.',
                    author: 'Emily R.',
                    role: 'Style Influencer',
                  },
                ].map((testimonial, index) => (
                  <ScrollReveal key={index} delay={index * 0.2}>
                    <div className="p-8 border border-white/10 hover:border-redora-red/30 transition-colors duration-500">
                      <div className="text-redora-red text-4xl mb-6">&ldquo;</div>
                      <p className="text-white/70 text-lg mb-8 italic leading-relaxed">
                        {testimonial.quote}
                      </p>
                      <div>
                        <p className="text-white font-medium">{testimonial.author}</p>
                        <p className="text-white/40 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ParallaxSection>
        </section>

        <Footer />
      </main>
    </LenisProvider>
  )
}

export default App
