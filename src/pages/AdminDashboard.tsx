import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AdminLogin } from '../components/AdminLogin'
import { ProductUploadForm } from '../components/ProductUploadForm'
import { Product } from '../types/product'

export function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<'upload' | 'products' | 'stats'>('upload')
  const [customProducts, setCustomProducts] = useState<Product[]>([])

  useEffect(() => {
    const adminAuth = localStorage.getItem('redora_admin')
    if (adminAuth === 'true') {
      setIsLoggedIn(true)
    }
    loadProducts()
  }, [])

  const loadProducts = () => {
    const stored = JSON.parse(localStorage.getItem('redora_custom_products') || '[]')
    setCustomProducts(stored)
  }

  const handleDeleteProduct = (id: string) => {
    const updated = customProducts.filter((p) => p.id !== id)
    localStorage.setItem('redora_custom_products', JSON.stringify(updated))
    setCustomProducts(updated)
  }

  const handleLogout = () => {
    localStorage.removeItem('redora_admin')
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-redora-red text-2xl font-bold">Redora</span>
            <span className="text-white/40 text-sm">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-white/50 text-sm hover:text-white transition-colors">
              View Store
            </a>
            <button
              onClick={handleLogout}
              className="text-white/50 text-sm hover:text-redora-red transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-1 mb-8 border-b border-white/10">
          {[
            { id: 'upload', label: 'Add Product' },
            { id: 'products', label: `Products (${customProducts.length})` },
            { id: 'stats', label: 'Overview' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3 text-sm tracking-wider transition-colors ${
                activeTab === tab.id
                  ? 'text-redora-red border-b-2 border-redora-red'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'upload' && (
          <ProductUploadForm onProductAdded={loadProducts} />
        )}

        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {customProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/40 text-lg mb-4">No products uploaded yet</p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-6 py-3 bg-redora-red text-white text-sm tracking-widest uppercase hover:bg-redora-red/90 transition-colors"
                >
                  Add Your First Product
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {customProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{product.name}</h3>
                      <p className="text-white/50 text-sm">{product.brand}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-white text-sm">${product.price.toFixed(2)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-white/30 text-sm line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-white/30 text-xs px-2 py-0.5 border border-white/10">
                          {product.category}
                        </span>
                        {product.isFashion && (
                          <span className="text-redora-red text-xs px-2 py-0.5 border border-redora-red/30">
                            Try-On
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-4 py-2 text-white/50 text-sm border border-white/10 hover:border-redora-red hover:text-redora-red transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <div className="p-6 bg-white/5 border border-white/10">
              <p className="text-white/50 text-sm mb-2">Total Products</p>
              <p className="text-3xl font-bold text-white">{customProducts.length}</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10">
              <p className="text-white/50 text-sm mb-2">Fashion Items</p>
              <p className="text-3xl font-bold text-redora-red">
                {customProducts.filter((p) => p.isFashion).length}
              </p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10">
              <p className="text-white/50 text-sm mb-2">Categories</p>
              <p className="text-3xl font-bold text-white">
                {new Set(customProducts.map((p) => p.category)).size}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
