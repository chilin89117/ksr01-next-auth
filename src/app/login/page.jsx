'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import Input from '@/components/Input.jsx'
import Spinner from '@/components/Spinner.jsx'

const Login = () => {
  const router = useRouter()

  const [{email, password}, setUser] = useState({email: '', password: ''})
  const [loading, setLoading] = useState(false)

  const handleChange = ({name, value}) => setUser(prev => ({...prev, [name]: value}))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('/api/users/login', {email, password})
      toast.success(response.data.message)
      router.replace('/') // Prevent user from going back by clicking browser back button
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      {loading && <Spinner />}

      <form
        className='flex w-[450px] flex-col gap-4 rounded-md bg-white p-5'
        onSubmit={handleSubmit}
      >
        <h1 className='text-center text-2xl font-bold'>LOGIN</h1>
        <hr />

        <Input
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={e => handleChange(e.target)}
          errMsg=''
          placeholder='enter email'
        />

        <Input
          label='Password'
          type='password'
          name='password'
          value={password}
          onChange={e => handleChange(e.target)}
          errMsg=''
          placeholder='enter password'
        />

        <button
          type='submit'
          className='h-11 rounded-md border border-none bg-black text-center uppercase text-white shadow-none disabled:cursor-not-allowed disabled:bg-gray-500'
        >
          login
        </button>

        <p className='text-sm font-semibold'>
          Forgot password?{' '}
          <Link
            href='/reset-password'
            className='text-blue-700'
          >
            Start here.
          </Link>
        </p>

        <p className='text-sm font-semibold'>
          Don&apos;t have an account?{' '}
          <Link
            href='/register'
            className='text-blue-700'
          >
            Register here.
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
