import LayoutProvider from '@/components/LayoutProvider.jsx'
import './globals.css'

export const metadata = {
  title: 'ksr01-next-auth',
  description: 'Generated by create next app'
}

// Server component cannot use usePathname() to conditionally render header,
// so create client component <LayoutProvider /> to do so (Video 9)
const RootLayout = ({children}) => (
  <html lang='en'>
    <body className='bg-gray-200 font-primary text-gray-900'>
      <LayoutProvider>{children}</LayoutProvider>
    </body>
  </html>
)

export default RootLayout
