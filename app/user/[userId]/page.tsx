import Link from 'next/link'
import { UserInfo } from './user-info'
import { CanvasList } from './canvas-list'
import { Button } from '@/components/ui/button'

// Fake user data
const user = {
  id: '123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/placeholder.svg?height=100&width=100'
}

// Fake canvas data
const canvases = [
  { id: '1', name: 'Project A', createdAt: '2023-05-01', modifiedAt: '2023-05-15' },
  { id: '2', name: 'Design B', createdAt: '2023-05-10', modifiedAt: '2023-05-20' },
  { id: '3', name: 'Sketch C', createdAt: '2023-05-20', modifiedAt: '2023-05-25' },
]

export default function UserPage({ params }: { params: { userId: string } }) {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Information</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      <UserInfo user={user} />
      <CanvasList canvases={canvases} />
    </div>
  )
}

