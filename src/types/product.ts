export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice: number
  images: string[]
  image: string
  rating: number
  soldCount: number
  description: string
  features: string[]
  category: string
  isFashion: boolean
  delivery: DeliveryInfo
  reviews: Review[]
}

export interface DeliveryInfo {
  freeShippingThreshold: number
  standardDays: string
  expressDays: string
  standardPrice: number
  expressPrice: number
}

export interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  date: string
  comment: string
  image?: string
  helpful: number
}
