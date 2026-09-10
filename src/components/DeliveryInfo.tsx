import { DeliveryInfo as DeliveryInfoType } from '@/types/product'

interface DeliveryInfoProps {
  delivery: DeliveryInfoType
  price: number
}

export function DeliveryInfo({ delivery, price }: DeliveryInfoProps) {
  const freeShipping = price >= delivery.freeShippingThreshold

  return (
    <div className="w-full border border-white/10 p-6">
      <h3 className="text-white text-sm tracking-widest uppercase mb-4">
        Delivery
      </h3>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-white/5 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-white text-sm">Standard Shipping</p>
              <p className="text-white/50 text-sm">
                {freeShipping ? (
                  <span className="text-green-500">FREE</span>
                ) : (
                  `$${delivery.standardPrice.toFixed(2)}`
                )}
              </p>
            </div>
            <p className="text-white/40 text-xs mt-1">
              Estimated {delivery.standardDays} business days
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-white/5 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-white text-sm">Express Shipping</p>
              <p className="text-white/50 text-sm">${delivery.expressPrice.toFixed(2)}</p>
            </div>
            <p className="text-white/40 text-xs mt-1">
              Estimated {delivery.expressDays} business days
            </p>
          </div>
        </div>

        {!freeShipping && (
          <div className="mt-4 p-3 bg-white/5 text-center">
            <p className="text-white/50 text-xs">
              Add ${(delivery.freeShippingThreshold - price).toFixed(2)} more for{' '}
              <span className="text-green-500">FREE shipping</span>
            </p>
          </div>
        )}

        {freeShipping && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 text-center">
            <p className="text-green-500 text-xs">
              You qualify for FREE standard shipping!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
