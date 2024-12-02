'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UploadThings() {
  const supabase = createClient()
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [picture, setPicture] = useState<File | null>(null)
  const [pictureUrl, setPictureUrl] = useState('')

  async function handleUpload(file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `block_user_assets/${fileName}`

    const { data, error } = await supabase.storage
      .from("GApe_public")
      .upload(filePath, file)

    if (error) {
      console.error('Error:', error)
      return
    }

 

      const { data: publicData } = supabase.storage.from('GApe_public').getPublicUrl(filePath)
  
      console.log(publicData.publicUrl)
      

    setPictureUrl(publicData.publicUrl)
  }

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPicture(file)
      handleUpload(file)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Things</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Edit</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input 
                id="company" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)} 
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="picture" className="text-right">
                Picture
              </Label>
              <Input 
                id="picture" 
                type="file" 
                accept="image/*"
                onChange={handlePictureChange}
                className="col-span-3"
              />
            </div>
            {picture && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-1"></div>
                <img 
                  src={URL.createObjectURL(picture)} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover col-span-3"
                />
              </div>
            )}
            {pictureUrl && (
              <a className='underline font-semibold text-sky-700' href={pictureUrl}>this is url</a>
            )}
          </div>
          <Button className="mt-4">Save changes</Button>
        </SheetContent>
      </Sheet>
    </div>
  )
}

