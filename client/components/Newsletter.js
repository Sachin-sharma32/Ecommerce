import React from 'react'
import SendIcon from '@mui/icons-material/Send';


const Newsletter = () => {
  return (
    <div className=' bg-green-100 my-10 flex flex-col items-center p-40 mb-0 gap-10'>
      <h2 className=' text-5xl font-semibold'>Signup to our newsletter</h2>
      <div className='flex gap-0 bg-white'>
        <h4 className=' p-2 border-2 border-black'>Your email</h4>
        <input type="email" placeholder='sachin2sharma001@gmail.com' autoComplete='false' className=' bg-white w-96 px-2 outline-none'/>
        <div className=' p-2 cursor-pointer border'><SendIcon/></div>
      </div>
    </div>
  )
}

export default Newsletter