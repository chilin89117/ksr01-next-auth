'use client'
import {useEffect, useState} from 'react'

const Profile = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      setUsers(data)
    }

    getUsers()
  }, [])

  return (
    <div>
      <h1 className='my-5 text-3xl font-bold'>Profile</h1>
      <hr />

      <div className='flex flex-col gap-5'>
        {users.map(user => (
          <div
            key={user.id}
            onClick={() => alert(user.name)}
          >
            <h1 className='text-xl font-bold'>Name: {user.name}</h1>
            <h2 className='text-md'>{user.address.city}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
