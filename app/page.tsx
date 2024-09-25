/** @format */
import RoutingButton from '@/components/ui/routingButton'
export default function Layout() {
    return (
        <div>
            {/* <header>This is header</header> */}
            <div>
                <div className='flex flex-row justify-center px-10'>
                    <h1 className='group'>
                        <div className='w-full flex flex-row content-around py-5'>
                            <div>
                                <span className='m-5'>Opening Page For </span>
                            </div>
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
                        />
                    </div>
                    <div className='border p-1 mx-5 border-solid border-black bg-green-300 hover:bg-slate-200 rounded-ls'>
                        <RoutingButton
                            displayName='Register'
                            routing='/authentication/register'
                        />
                    </div>
                    <div className='border p-1 mx-5 border-solid border-black bg-green-300 hover:bg-slate-200 rounded-ls'>
                        <RoutingButton displayName='Canvas' routing='/canvas' />
                    </div>
                </div>
            </div>
        </div>
    )
}
