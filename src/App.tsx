import { HeroBanner } from './components/HeroBanner'
import { CategorySection } from './components/CategorySection'
import { FlashDeals } from './components/FlashDeals'
import { ProductGrid } from './components/ProductGrid'
import { Footer } from './components/Footer'

function App() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <HeroBanner />
      <CategorySection />
      <FlashDeals />
      <ProductGrid />
      <Footer />
    </main>
  )
}

export default App
