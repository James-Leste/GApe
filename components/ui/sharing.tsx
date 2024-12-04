/** @format */

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Share2,
    Linkedin,
    Instagram,
    Twitter,
    Facebook,
    Link,
} from 'lucide-react'
import { toast } from 'sonner'

export default function SocialShare() {
    const [url, setUrl] = useState('')

    useEffect(() => {
        // Only run on client-side
        if (typeof window !== 'undefined') {
            let currentUrl = window.location.href
            currentUrl = currentUrl.replace('/edit/', '/share/')
            setUrl(currentUrl)
        }
    }, [])

    const handleShare = (platform: string) => {
        let shareUrl = ''
        const encodedUrl = encodeURIComponent(url)
        const encodedText = encodeURIComponent('Check out this awesome CV using GApe easily!')

        switch (platform) {
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&text=${encodedText}${encodedUrl}`
                break
            case 'instagram':
                // Instagram doesn't have a direct share URL, so we'll just open Instagram
                shareUrl = 'https://www.instagram.com/'
                break
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
                break
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
                break
            default:
                break
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer')
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                toast.success(
                    'URL Copied. The share URL has been copied to your clipboard.'
                )
            })
            .catch((err) => {
                console.error('Failed to copy: ', err)
                toast.error('Failed to copy the URL. Please try again.')
            })
    }

    return (
        <div className='flex flex-col items-center justify-center bg-background'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'secondary'} size='icon'>
                        <Share2 className='mr-2 h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleShare('linkedin')}>
                        <Linkedin className='mr-2 h-4 w-4' />
                        LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('instagram')}>
                        <Instagram className='mr-2 h-4 w-4' />
                        Instagram
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('twitter')}>
                        <Twitter className='mr-2 h-4 w-4' />X (Twitter)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('facebook')}>
                        <Facebook className='mr-2 h-4 w-4' />
                        Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={copyToClipboard}>
                        <Link className='mr-2 h-4 w-4' />
                        Copy URL
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
