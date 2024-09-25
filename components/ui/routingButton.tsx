/** @format */

'use client'
import { useRouter } from 'next/navigation'
export default function RoutingButton({
    routing,
    displayName,
}: {
    routing: string
    displayName: string
}) {
    const router = useRouter()
    const click = () => {
        console.log(routing)
        router.push(routing)
    }
    return (
        <button className='' onClick={click}>
            {displayName}
        </button>
    )
}
