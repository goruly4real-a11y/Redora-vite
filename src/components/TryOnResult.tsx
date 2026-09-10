import { motion } from 'framer-motion'

interface TryOnResultProps {
  resultUrl: string
  onDownload?: () => void
  onReset?: () => void
}

export function TryOnResult({ resultUrl, onDownload, onReset }: TryOnResultProps) {
  const handleDownload = () => {
    if (onDownload) {
      onDownload()
    } else {
      const link = document.createElement('a')
      link.href = resultUrl
      link.download = `redora-tryon-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="relative mb-6">
        <img
          src={resultUrl}
          alt="Try-on result"
          className="w-full aspect-[4/5] object-cover rounded-lg"
        />
        <div className="absolute top-4 left-4 bg-redora-red text-white text-xs px-3 py-1.5 tracking-widest uppercase">
          Generated
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleDownload}
          className="flex-1 py-4 bg-white text-black text-sm tracking-widest uppercase hover:bg-white/90 transition-colors"
        >
          Download
        </button>
        <button
          onClick={onReset}
          className="flex-1 py-4 border border-white/30 text-white text-sm tracking-widest uppercase hover:border-redora-red hover:text-redora-red transition-colors"
        >
          Try Another
        </button>
      </div>

      <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
        <p className="text-white/50 text-sm text-center">
          This is a preview using mock data. Connect to an AI API for real try-on results.
        </p>
      </div>
    </motion.div>
  )
}
