'use client'
import {useEffect, useState} from 'react'
import {useSearchParams} from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import Spinner from '@/components/Spinner.jsx'

const VerifyEmail = () => {
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // User is directed here (.../?token=...) when clicked on button in email
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true)
        await axios.post('/api/users/verify-email', {token})
        setVerified(true)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className='flex h-screen items-center justify-center text-3xl font-bold'>
      {loading && <Spinner />}

      {verified && (
        <h1 className='text-green-600'>
          Email successfully verified! Go ahead and{' '}
          <Link
            href='/login'
            className='text-blue-600'
          >
            log in.
          </Link>
        </h1>
      )}

      {error && <h1 className='text-red-700'>Something went wrong. Please try again.</h1>}
    </div>
  )
}

export default VerifyEmail
