/** @format */

'use client'
import { useRouter } from 'next/navigation'
export default function RoutingButton({
    routing,
    displayName,
    className,
}: {
    routing: string
    displayName: string
    className: string
}) {
    const router = useRouter()
    const click = () => {
        console.log(routing)
        router.push(routing)
    }
    return (
        <button className={className} onClick={click}>
            {displayName}
        </button>
    )
}
