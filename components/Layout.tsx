import { ComponentProps, FC } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './Navbar'
import NetworkWarning from './NetworkWarning'

type Props = {
  navbar: ComponentProps<typeof Navbar>
}

const Layout: FC<Props> = ({ children, navbar }) => {
  return (
    <>
      <Toaster position={'top-right'} />
      <NetworkWarning />
      <main className="mx-auto grid max-w-[2560px] grid-cols-12 gap-x-4 pb-4 ">
        <Navbar {...navbar} />
        {children}
      </main>
    </>
  )
}

export default Layout
