import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LenisProvider } from '../components/LenisProvider'
import { ParallaxSection } from '../components/ParallaxSection'
import { ScrollReveal } from '../components/ScrollReveal'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { WovenClothHero } from '../components/WovenClothHero'

gsap.registerPlugin(ScrollTrigger)

const fashionItems = [
  {
    id: 1,
    name: 'Midnight Velvet Blazer',
    price: 489,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    category: 'Outerwear',
  },
  {
    id: 2,
    name: 'Silk Cascade Dress',
    price: 678,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    category: 'Dresses',
  },
  {
    id: 3,
    name: 'Titanium Watch Collection',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    category: 'Accessories',
  },
  {
    id: 4,
    name: 'Cashmere Ensemble',
    price: 892,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
    category: 'Knitwear',
  },
  {
    id: 5,
    name: 'Leather Artisan Bag',
    price: 567,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600',
    category: 'Bags',
  },
  {
    id: 6,
    name: 'Sterling Statement Ring',
    price: 345,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600',
    category: 'Jewelry',
  },
]

export function FashionPage() {
  const mannequinRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const mannequin = mannequinRef.current
    const path = pathRef.current
    if (!mannequin || !path) return

    const pathLength = path.getTotalLength()

    gsap.set(mannequin, {
      offsetDistance: '0%',
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.fashion-hero',
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
      },
    })

    tl.to(mannequin, {
      offsetDistance: '100%',
      ease: 'none',
      duration: 1,
    })

    gsap.to(mannequin, {
      rotation: 5,
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut',
    })

    const fashionCards = gsap.utils.toArray('.fashion-card')
    fashionCards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 100,
        rotation: index % 2 === 0 ? -5 : 5,
        scrollTrigger: {
          trigger: card as Element,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
        },
      })
    })

    return () => {
      tl.scrollTrigger?.kill()
    }
  }, [])

  return (
    <LenisProvider>
      <main className="bg-[#0a0a0a] min-h-screen">
        <Navbar />

        <section className="fashion-hero relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            <WovenClothHero />
          </div>

          <div className="absolute inset-0 z-10">
            <svg
              ref={pathRef}
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 10,90 Q 30,10 50,50 T 90,10"
                fill="none"
                stroke="rgba(196, 30, 58, 0.2)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          <div
            ref={mannequinRef}
            className="absolute z-20"
            style={{ offsetPath: "path('M 10,90 Q 30,10 50,50 T 90,10')" }}
          >
            <div className="relative">
              <svg
                width="80"
                height="200"
                viewBox="0 0 80 200"
                className="drop-shadow-2xl"
              >
                <ellipse cx="40" cy="20" rx="15" ry="18" fill="#C41E3A" opacity="0.9" />
                <rect x="25" y="38" width="30" height="60" rx="5" fill="#1a1a1a" />
                <rect x="20" y="98" width="12" height="70" rx="4" fill="#1a1a1a" />
                <rect x="48" y="98" width="12" height="70" rx="4" fill="#1a1a1a" />
                <ellipse cx="40" cy="185" rx="14" ry="8" fill="#D4AF37" />
              </svg>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-redora-red tracking-widest whitespace-nowrap">
                NEW ARRIVAL
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <ScrollReveal>
                <span className="text-redora-red text-sm tracking-[0.3em] uppercase block mb-4">
                  Fashion Forward
                </span>
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
                  The <span className="text-redora-red italic">Collection</span>
                </h1>
                <p className="text-white/50 text-xl max-w-2xl mx-auto">
                  Where timeless elegance meets contemporary design. Scroll to explore the journey of style.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/40 text-xs tracking-widest">SCROLL</span>
              <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </div>
          </div>
        </section>

        <section className="relative py-32 px-4">
          <ParallaxSection speed={0.15}>
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-20">
                  <span className="text-redora-red text-sm tracking-[0.3em] uppercase block mb-4">
                    Featured Pieces
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Curated <span className="text-redora-red italic">Elegance</span>
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {fashionItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="fashion-card group relative bg-[#111111] overflow-hidden"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="bg-redora-red/90 text-white text-[10px] px-3 py-1.5 tracking-widest uppercase">
                          {item.category}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white text-lg mb-2">{item.name}</h3>
                        <p className="text-redora-red text-xl font-medium">${item.price}</p>
                      </div>
                    </div>

                    <div className="absolute inset-0 border border-white/0 group-hover:border-redora-red/30 transition-colors duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </ParallaxSection>
        </section>

        <section className="relative py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />

          <ParallaxSection speed={0.1} className="relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <ScrollReveal direction="left">
                  <div className="relative">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800"
                        alt="Fashion Model"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-full h-full border border-redora-red/20 -z-10" />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right">
                  <div>
                    <span className="text-redora-red text-sm tracking-[0.3em] uppercase block mb-4">
                      The Vision
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                      Redefining <span className="text-redora-red italic">Modern</span> Luxury
                    </h2>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed">
                      Our fashion collection draws inspiration from the world&apos;s runways,
                      reimagined for the modern connoisseur. Each piece is a statement,
                      each ensemble a story.
                    </p>
                    <p className="text-white/60 text-lg mb-12 leading-relaxed">
                      From the ateliers of Milan to the streets of Tokyo, we curate
                      pieces that transcend trends and define personal style.
                    </p>
                    <button className="group relative px-8 py-4 bg-redora-red text-white uppercase tracking-widest text-sm overflow-hidden transition-all duration-500">
                      <span className="relative z-10">View Full Collection</span>
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ParallaxSection>
        </section>

        <Footer />
      </main>
    </LenisProvider>
  )
}
