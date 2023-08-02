'use client'
import {useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import Input from '@/components/Input.jsx'
import Spinner from '@/components/Spinner.jsx'

const ResetPassword = () => {
  const router = useRouter()

  const [email, setEmail] = useState('') // Address for sending email link
  const [password, setPassword] = useState('') // New password
  const [confirmPassword, setConfirmPassword] = useState('') // Confirm new password

  // Begin validation only when form first submits (for showing error messages)
  const [startValidate, setStartValidate] = useState(false)
  // When request made to backend (for showing spinner)
  const [loading, setLoading] = useState(false)
  // When task is completed, disable button
  const [done, setDone] = useState(false)

  // User is directed here (.../?token=...) when email is verified
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  // Validations
  const hasEmailError = email.length <= 5 || !email.includes('@') || !email.includes('.')
  const passwordError = password.trim().length < 6 || password.trim().length > 12
  const confirmPasswordError = confirmPassword !== password
  const hasPasswordError = passwordError || confirmPasswordError
  // Validation messages
  const emailErrMsg = 'Proper email is required.'
  const passwordErrMsg = 'Password must be between 6 and 12 characters.'
  const confirmPasswordErrMsg = 'Passwords do not match.'

  // Send email to user
  const handleEmailSubmit = async e => {
    e.preventDefault()
    setStartValidate(true)

    if (!hasEmailError) {
      setLoading(true)
      try {
        await axios.post('/api/users/reset-password', {email})
        toast.success('Reset password link sent to your email.')
        setDone(true)
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        setLoading(false)
      }
    }
  }

  // Reset password
  const handlePasswordSubmit = async e => {
    e.preventDefault()
    setStartValidate(true)

    if (!hasPasswordError) {
      setLoading(true)
      try {
        await axios.put('/api/users/reset-password', {token, password})
        toast.success('Successfully reset password.')
        router.replace('/login')
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        setLoading(false)
        setDone(true)
      }
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      {loading && (!hasEmailError || !hasPasswordError) && <Spinner />}

      {!token ? (
        // Show form to enter email if there's no token in URL
        <form
          className='flex w-[450px] flex-col gap-4 rounded-md bg-white p-5'
          onSubmit={handleEmailSubmit}
        >
          <h1 className='text-center text-xl font-bold'>ENTER EMAIL TO RESET PASSWORD</h1>
          <hr />

          <Input
            label='Email'
            type='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            errMsg={startValidate && hasEmailError ? emailErrMsg : ''}
            placeholder='enter email'
          />

          <button
            type='submit'
            className='h-11 rounded-md border border-none bg-black text-center uppercase text-white shadow-none disabled:cursor-not-allowed disabled:bg-gray-500'
            disabled={done}
          >
            get password reset link
          </button>
        </form>
      ) : (
        // Show form to submit new password if there's token in URL
        <form
          className='flex w-[450px] flex-col gap-4 rounded-md bg-white p-5'
          onSubmit={handlePasswordSubmit}
        >
          <h1 className='text-center text-xl font-bold'>RESET PASSWORD</h1>
          <hr />

          <Input
            label='New Password'
            type='password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            errMsg={startValidate && passwordError ? passwordErrMsg : ''}
            placeholder='enter password'
          />

          <Input
            label='Confirm New Password'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            errMsg={startValidate && confirmPasswordError ? confirmPasswordErrMsg : ''}
            placeholder='enter password again'
          />

          <button
            type='submit'
            className='h-11 rounded-md border border-none bg-black text-center uppercase text-white shadow-none disabled:cursor-not-allowed disabled:bg-gray-500'
            disabled={done}
          >
            reset password
          </button>
        </form>
      )}
    </div>
  )
}

export default ResetPassword
