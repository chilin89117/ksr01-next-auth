'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import Input from '@/components/Input.jsx'
import Spinner from '@/components/Spinner.jsx'

const Register = () => {
  const router = useRouter()

  // Begin validation only when form first submits (for showing error messages)
  const [startValidate, setStartValidate] = useState(false)
  // When request made to backend (for showing spinner)
  const [loading, setLoading] = useState(false)

  const [{username, email, password}, setUser] = useState({username: '', email: '', password: ''})

  // Validations
  const usernameError = username.trim().length < 2 || username.trim().length > 12
  const emailError = email.trim().length === 0
  const passwordError = password.trim().length < 6 || password.trim().length > 12
  // Validation messages
  const usernameErrMsg = 'Username must be between 2 and 12 characters.'
  const emailErrMsg = 'Email is required.'
  const passwordErrMsg = 'Password must be between 6 and 12 characters.'
  // Flag to see if form can be submitted
  const hasError = usernameError || emailError || passwordError

  const handleChange = ({name, value}) => setUser(prev => ({...prev, [name]: value}))

  const handleSubmit = async e => {
    e.preventDefault()
    setStartValidate(true)

    if (!hasError) {
      setLoading(true)
      try {
        const response = await axios.post('/api/users/register', {username, email, password})
        toast.success(response.data.message)
        router.replace('/login')
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      {loading && !hasError && <Spinner />}

      <form
        className='flex w-[450px] flex-col gap-4 rounded-md bg-white p-5'
        onSubmit={handleSubmit}
      >
        <h1 className='text-center text-2xl font-bold'>REGISTER</h1>
        <hr />

        <Input
          label='Username'
          type='text'
          name='username'
          value={username}
          onChange={e => handleChange(e.target)}
          errMsg={startValidate && usernameError ? usernameErrMsg : ''}
          placeholder='enter username'
        />

        <Input
          label='Email'
          type='email'
          name='email'
          value={email}
          onChange={e => handleChange(e.target)}
          errMsg={startValidate && emailError ? emailErrMsg : ''}
          placeholder='enter email'
        />

        <Input
          label='Password'
          type='password'
          name='password'
          value={password}
          onChange={e => handleChange(e.target)}
          errMsg={startValidate && passwordError ? passwordErrMsg : ''}
          placeholder='enter password'
        />

        <button
          type='submit'
          className='h-11 rounded-md border border-none bg-black text-center uppercase text-white shadow-none disabled:cursor-not-allowed disabled:bg-gray-500'
        >
          register
        </button>

        <p className='text-sm font-semibold'>
          Already have an account? Go to{' '}
          <Link
            href='/login'
            className='text-blue-700'
          >
            login
          </Link>{' '}
          page.
        </p>
      </form>
    </div>
  )
}

export default Register
