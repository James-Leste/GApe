'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Share2, Trash2 } from 'lucide-react'

interface Canvas {
  id: string
  name: string
  createdAt: string
  modifiedAt: string
}

export function CanvasList({ canvases }: { canvases: Canvas[] }) {
  const handleDelete = (id: string) => {
    // Here you would typically send a delete request to your backend
    console.log('Delete canvas:', id)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Canvases</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Modified At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {canvases.map((canvas) => (
            <TableRow key={canvas.id}>
              <TableCell>{canvas.name}</TableCell>
              <TableCell>{new Date(canvas.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(canvas.modifiedAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/canvas/edit/${canvas.id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/canvas/share/${canvas.id}`}>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="destructive" size="icon" className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(canvas.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

