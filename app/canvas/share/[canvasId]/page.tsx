/** @format */

import App from '../share_list'

export default function ShareCanvasPage({
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
