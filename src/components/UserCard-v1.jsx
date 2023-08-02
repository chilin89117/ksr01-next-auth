'use client'
const UserCard = ({user}) => {
  return (
    <div onClick={() => alert(user.name)}>
      <h1 className='text-xl font-bold'>Name: {user.name}</h1>
      <h2 className='text-md'>{user.address.city}</h2>
    </div>
  )
}

export default UserCard
