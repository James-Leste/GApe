/** @format */

import App from '@/app/canvas/mixed-size-lists'

export default function EditCanvasPage({
    params,
}: {
    params: { canvasId: string }
}) {
    return (
        <div className='h-full'>
            <App canvas_id={params.canvasId}></App>
        </div>
    )
}
