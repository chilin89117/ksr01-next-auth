const Spinner = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black opacity-50'>
      <div className='h-16 w-16 animate-spin rounded-full border-8 border-black border-t-white'></div>
    </div>
  )
}

export default Spinner
