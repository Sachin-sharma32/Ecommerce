import React from 'react'
import Smooth from '../utils/smooth'
import MyOrders from '../components/MyOrders'
import Link from 'next/link'
import WestIcon from '@mui/icons-material/West';


const Orders = () => {
  return (
    <Smooth className=' min-h-screen mt-[6rem] flex justify-center gap-14 text-xs'>
      <Link href='/' className=' flex h-fit items-center gap-1 hover:gap-4 transition-all duration-200'>
        <WestIcon />
        <p>Back to Home</p>
      </Link>
      <MyOrders />
    </Smooth>
  )
}

export default Orders