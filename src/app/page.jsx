import {cookies} from 'next/headers'
import axios from 'axios'

const getUser = async () => {
  try {
    // Server component needs to access cookie from browser and attach to request
    const token = cookies().get(process.env.TOKEN_NAME) || {}

    const response = await axios.get(`${process.env.DOMAIN}/api/users/me`, {
      headers: {
        Cookie: `${token.name}=${token.value}`
      }
    })
    return response.data.data
  } catch (error) {
    return null
  }
}

const Home = async () => {
  const user = await getUser()

  return (
    <div>
      <h1 className='my-5 text-3xl font-bold'>{user?.username}</h1>
    </div>
  )
}

export default Home
