import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ShareCanvasPage({ params }: { params: { canvasId: string } }) {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Share Canvas</h1>
        <Link href="/user/123">
          <Button variant="outline">Back to User Profile</Button>
        </Link>
      </div>
      <p className="text-xl">Sharing canvas with ID: {params.canvasId}</p>
      {/* Add your canvas sharing interface here */}
    </div>
  )
}
