/** @format */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FeatureCard } from "@/components/ui/feature-card"
import { SizeOption } from "@/components/ui/size-option"

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F5E6D3]">
      {/* NavBar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-2xl font-mono font-bold text-black">
          GAPE
        </Link>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="bg-[#90EE90] hover:bg-[#90EE90]/90 border-none text-black h-8 px-4"
            onClick={() => router.push('/canvas')}
          >
            Try Now
          </Button>
          <Button 
            variant="outline" 
            className="bg-[#90EE90] hover:bg-[#90EE90]/90 border-none text-black h-8 px-4"
            onClick={() => router.push('/authentication/login')}
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            className="bg-[#90EE90] hover:bg-[#90EE90]/90 border-none text-black h-8 px-4"
            onClick={() => router.push('/authentication/register')}
          >
            Register
          </Button>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-6xl font-mono font-bold text-black tracking-tight leading-tight">
            Get A Page Easily
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-mono text-lg">
            Create, Customize, And Conquer Your
            <br />
            One-Page Designs - Effortlessly.
          </p>
        </section>

        {/* Features Section */}
        <div className="space-y-32">
          {/* First Feature */}
          <FeatureCard
            imageSrc="/images/feature-1.png"
          />
          
          {/* Second Feature */}
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-mono font-bold text-black">
              Drag, Drop, And Design: Instant
              <br />
              Customization At Your Fingertips.
            </h2>
            <FeatureCard
              imageSrc="/images/feature-2.png"
            />
          </div>

          {/* Size Options */}
          <section className="space-y-12">
            <h2 className="text-2xl font-mono font-bold text-center text-black">
              Choose From Three Flexible Sizes
              <br />
              To Perfectly Fit Your Design Needs.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
              <SizeOption size="S" imageSrc="/images/size-s.png" />
              <SizeOption size="M" imageSrc="/images/size-m.png" />
              <SizeOption size="L" imageSrc="/images/size-l.png" />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 mt-32">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl font-mono font-bold">Follow Us To Get Update</h2>
          <a 
            href="https://Github.Com/James-Leste/GApe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-white hover:underline"
          >
            https://Github.Com/James-Leste/GApe
          </a>
        </div>
      </footer>
    </div>
  )
}

