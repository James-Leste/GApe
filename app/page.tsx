/** @format */
import RoutingButton from '@/components/ui/routingButton'
export default function Layout() {
    return (
        <div className='h-full w-full flex items-center justify-center '>
            {/* <header>This is header</header> */}
            <div className='h-fit w-fit p-10 rounded-3xl bg-slate-50 shadow-md max-w-sm'>
                <div className='flex flex-row justify-center px-10'>
                    <h1 className='group'>
                        <div className='flex flex-row content-around my-5'>
                            <div>
                                <span className='group-hover:hidden m-0 p-0'>
                                    G A p e
                                </span>
                            </div>
                            <div>
                                <span className='m-0 p-0 hidden group-hover:inline bg-green-300'>
                                    Get A Page Easily
                                </span>
                            </div>
                        </div>
                    </h1>
                    {/* <h1>Opening Page For GApe</h1> */}
                </div>

                <div className='flex flex-row content-center justify-center'>
                    <div className='border p-1 mx-5 border-solid border-black bg-green-300 hover:bg-slate-200 rounded-ls '>
                        <RoutingButton
                            displayName='Login'
                            routing='/authentication/login'
                            className=''
                        />
                    </div>
                    <div className='border p-1 mx-5 border-solid border-black bg-green-300 hover:bg-slate-200 rounded-ls'>
                        <RoutingButton
                            displayName='Register'
                            routing='/authentication/register'
                            className=''
                        />
                    </div>
                    <div className='border p-1 mx-5 border-solid border-black bg-green-300 hover:bg-slate-200 rounded-ls'>
                        <RoutingButton
                            displayName='Canvas'
                            routing='/canvas'
                            className=''
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
