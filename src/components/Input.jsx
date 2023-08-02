'use client'
const Input = ({label, type, name, value, onChange, errMsg, placeholder}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label
        htmlFor={name}
        className='ml-1 font-semibold'
      >
        {label}
      </label>
      <input
        className='h-11 w-full rounded-md border border-solid border-gray-400 pl-3 focus:border-gray-800 focus:outline-none'
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      {errMsg && <p className='ml-1 text-sm font-semibold text-red-700'>{errMsg}</p>}
    </div>
  )
}

export default Input
