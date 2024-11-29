import { Button } from "@/components/ui/button"
import Image from "next/image"

interface SizeOptionProps {
  size: string
  imageSrc: string
}

export function SizeOption({ size, imageSrc }: SizeOptionProps) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden bg-white shadow-lg">
        <Image
          src={imageSrc}
          alt={`Size ${size}`}
          fill
          className="object-contain p-4"
        />
      </div>
      <Button 
        variant="outline" 
        className="bg-[#90EE90] hover:bg-[#90EE90]/90 border-none w-12 h-12 text-black font-mono text-xl"
      >
        {size}
      </Button>
    </div>
  )
}