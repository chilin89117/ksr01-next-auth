import UserCard from '@/components/UserCard-v1.jsx' // Client component

// Async function to get data is defined outside the server component; no useEffect() and useState() here
export const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data
}

// Server component
const Home = async () => {
  const users = await getUsers()

  return (
    <div>
      <h1 className='my-5 text-3xl font-bold'>Home</h1>
      <hr />

      <div className='flex flex-col gap-5'>
        {/* Pass data from server component to client component for user interactivity and state management */}
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
