'use client'
import {usePathname, useRouter} from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import {Toaster, toast} from 'react-hot-toast'
import {RiLogoutBoxRLine} from 'react-icons/ri'

// Client component to access pathname in order to conditionally render header (Video 9)
const LayoutProvider = ({children}) => {
  const pathname = usePathname()
  const router = useRouter()

  // Flag to control if <Navbar /> should be displayed
  const noNavbarRoutes =
    pathname === '/login' || pathname === '/register' || pathname === '/verify-email' || pathname === '/reset-password'

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout')
      toast.success('Successfully logged out.')
      router.replace('/login') // Prevent user from going back by clicking browser back button
    } catch (error) {
      toast.error('Logout failed:', error.response.data.message)
    }
  }

  return (
    <>
      {/* https://react-hot-toast.com/docs */}
      <Toaster
        position='top-right'
        containerClassName='font-semibold'
        toastOptions={{
          duration: 3500,
          style: {
            background: '#000',
            color: '#fff'
          }
        }}
      />

      {!noNavbarRoutes && (
        <nav className='flex items-center justify-between bg-black px-5 py-3 text-white'>
          <Link
            href='/'
            className='text-2xl font-bold'
          >
            ksr01-next-auth
          </Link>
          <div className='flex items-center gap-5 text-xl'>
            <Link href='/'>Home</Link>
            <Link href='/profile'>Profile</Link>
            <RiLogoutBoxRLine
              className='ml-4 cursor-pointer text-2xl'
              onClick={handleLogout}
            />
          </div>
        </nav>
      )}

      <div className='p-3'>{children}</div>
    </>
  )
}

export default LayoutProvider
