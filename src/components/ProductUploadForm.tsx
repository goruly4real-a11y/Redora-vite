import { useState } from 'react'
import { motion } from 'framer-motion'

interface ProductFormData {
  name: string
  brand: string
  price: string
  originalPrice: string
  description: string
  category: string
  isFashion: boolean
  imageUrl: string
  features: string
}

interface ProductUploadFormProps {
  onProductAdded: () => void
}

const defaultFormData: ProductFormData = {
  name: '',
  brand: '',
  price: '',
  originalPrice: '',
  description: '',
  category: 'Electronics',
  isFashion: false,
  imageUrl: '',
  features: '',
}

const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Toys',
]

export function ProductUploadForm({ onProductAdded }: ProductUploadFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(defaultFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newProduct = {
      id: 'custom-' + Date.now(),
      name: formData.name,
      brand: formData.brand,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice) || parseFloat(formData.price),
      image: formData.imageUrl || 'https://picsum.photos/seed/custom/400/400',
      images: [
        formData.imageUrl || 'https://picsum.photos/seed/custom/800/800',
      ],
      rating: 4.5,
      soldCount: 0,
      description: formData.description,
      features: formData.features
        .split('\n')
        .filter((f) => f.trim()),
      category: formData.category,
      isFashion: formData.isFashion,
      delivery: {
        freeShippingThreshold: 50,
        standardDays: '3-5',
        expressDays: '1-2',
        standardPrice: 5.99,
        expressPrice: 12.99,
      },
      reviews: [],
    }

    const existing = JSON.parse(
      localStorage.getItem('redora_custom_products') || '[]'
    )
    existing.push(newProduct)
    localStorage.setItem(
      'redora_custom_products',
      JSON.stringify(existing)
    )

    setFormData(defaultFormData)
    setSuccess(true)
    setIsLoading(false)

    setTimeout(() => {
      setSuccess(false)
      onProductAdded()
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Add New Product
        </h2>
        <p className="text-white/50 text-sm">
          Fill in the details to add a product to the store
        </p>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-sm"
        >
          Product added successfully!
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/70 text-sm mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-redora-red transition-colors"
              placeholder="Wireless Earbuds"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">
              Brand *
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-redora-red transition-colors"
              placeholder="SoundMaster"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/70 text-sm mb-2">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-redora-red transition-colors"
              placeholder="29.99"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">
              Original Price ($)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-redora-red transition-colors"
              placeholder="59.99"
            />
          </div>
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-redora-red transition-colors resize-none"
            placeholder="Product description..."
          />
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2">
            Features (one per line)
          </label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-redora-red transition-colors resize-none"
            placeholder={"Feature 1\nFeature 2\nFeature 3"}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/70 text-sm mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-redora-red transition-colors"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-[#0a0a0a]"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isFashion"
                checked={formData.isFashion}
                onChange={handleChange}
                className="w-5 h-5 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-redora-red"
              />
              <span className="text-white/70 text-sm">
                Enable Virtual Try-On
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-redora-red transition-colors"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-white/30 text-xs mt-1">
            Leave empty for random placeholder image
          </p>
        </div>

        {formData.imageUrl && (
          <div className="mt-4">
            <p className="text-white/50 text-sm mb-2">Preview:</p>
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="w-32 h-32 object-cover border border-white/10"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !formData.name || !formData.price}
          className="w-full py-4 bg-redora-red text-white text-sm tracking-widest uppercase hover:bg-redora-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </motion.div>
  )
}
