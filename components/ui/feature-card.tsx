import Image from "next/image"

interface FeatureCardProps {
  title?: string
  description?: string
  imageSrc: string
}

export function FeatureCard({ title, description, imageSrc }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center space-y-4 max-w-4xl mx-auto">
      {title && description && (
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-mono font-bold text-black">{title}</h2>
          <p className="text-gray-500 font-mono">{description}</p>
        </div>
      )}
      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-white shadow-lg">
        <Image
          src={imageSrc}
          alt={title || "Feature preview"}
          fill
          className="object-contain p-4"
        />
      </div>
    </div>
  )
}