/** @format */

'use client'
import { useRouter } from 'next/navigation'
export default function RoutingButton({
    onClick = () => console.log('No implementation'),
    routing,
    displayName = 'A button',
    className = '',
}: {
    onClick?: Function
    routing?: string
    displayName?: string
    className?: string
}) {
    const router = useRouter()
    const click = () => {
        onClick()
        if (routing) {
            console.log(routing)
            router.push(routing)
        } else {
            console.log('Routing is not provided.')
            // If routing is not provided, you can handle accordingly
        }
    }
    return (
        <button className={className} onClick={click}>
            {displayName}
        </button>
    )
}
