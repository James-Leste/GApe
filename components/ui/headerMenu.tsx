/** @format */
interface HeaderMenuProps {
    children?: React.ReactNode;
}
export default function HeaderMenu({children}:HeaderMenuProps) {
    return (
        <header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur border-b border-[#a69986] supports-[backdrop-filter]:bg-background/60'>
            <div className='container flex h-14 max-w-screen-2xl items-center '>
                <div className='mr-4 hidden md:flex items-center justify-between w-full'>
                    <div className=' h-full pl-9 pr-9 flex flex-col justify-center items-center '>
                        <div className='text-[#128149] text-2xl font-inter font-semibold break-words'>
                            <a href='/'>GApe</a>
                        </div>
                      
                    </div>
                    {children}
                    
                    {/* <nav className='flex items-center gap-4 text-sm lg:gap-6'>
                        <a
                            className='transition-colors hover:text-foreground/80 text-foreground/60'
                            href='/'
                        >
                            Home
                        </a>
                    </nav> */}
                </div>
            </div>
        </header>
    )
}
