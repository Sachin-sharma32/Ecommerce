/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Error from '../utils/error'
import MessageModel from '../utils/messageModel'
import { Order } from '../utils/types'
import moment from 'moment'
import { useUpdateOrder } from '../hooks/useOrder'
import { useDispatch } from 'react-redux'
import { setOrders } from '../app/slices'

interface AppProps {
  orders: any,
  admin?: any,
  status?: any,
}

const OrdersTable = ({ orders, admin, status }: AppProps) => {

  const [message, setMessage] = useState("")

  let filterOrders = orders
  if (status) {
    filterOrders = orders?.filter(order => {
      return order.status === status
    })
  }

  const dispatch = useDispatch()
  const onSuccess = (data) => {
    console.log(data)
    dispatch(setOrders(data.data.data.docs))
  }

  const { mutate: updateOrder, data } = useUpdateOrder(onSuccess)
  const changeOrderStatus = (currentStatus, orderId) => {
    let nextStatus: string;
    if (currentStatus === 'order placed') {
      nextStatus = 'out for delivery';
    } else if (currentStatus === 'out for delivery') {
      nextStatus = 'delivered'
    } else if (currentStatus === 'delivered') {
      setMessage('This is the last stage')
      setTimeout(() => {
        setMessage('')
      }, 2000)
      return
    }
    updateOrder({ orderId, status: nextStatus })
  }

  const cancelOrder = (orderId) => {
    updateOrder({ orderId, status: 'cancled' })
  }

  if (filterOrders?.length === 0) {
    return (
      <MessageModel>There are no orders to show</MessageModel>
    )
  }

  return (
    <div className='text-[10px] sm:text-xs flex flex-col gap-4 p-4'>
      {filterOrders?.map((order) => (
        <div key={order._id} className='border flex flex-col justify-between'>
          <div
            className="grid grid-cols-3 gap-1 md:gap-10 p-2"
          >
            <div className='flex flex-col gap-2 w-fit'>
              {order.products.map(product => (
                <div key={product._id} className=' flex items-center gap-2 relative orderProduct cursor-pointer w-fit h-fit'>
                  <img
                    src={product.product.coverImg}
                    className=" w-[30px] h-[30px]"
                    alt="img"
                  />
                  <p className='flex'>{product.product.title}</p>
                  <div className='absolute top-7 bg-white shadow-2xl p-2 border-2 orderDetails w-40 z-40'>
                    <p className='flex'><div className=' w-20'>Name</div>{product.product.title}</p>
                    <p className="flex"><div className=' w-20'>Price</div> Rs. {product.product.discountPrice ? product.product.discountPrice : product.product.price}</p>
                    <p className="flex"><div className=' w-20'>Quantity</div> {product.quantity}</p>
                    <p className="flex"><div className=' w-20'>Price</div>{product.color}</p>
                    <p className="flex"><div className=' w-20'>Price</div>{product.size}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className=' w-full'>
              <p className='flex'><div className='w-20'>Line 1</div><span>{order.address.line1}</span></p>
              <p className='flex'><div className='w-20'>Line 2</div><span>{order.address.line2}</span></p>
              <p className='flex'><div className='w-20'>City</div><span>{order.address.city}</span></p>
              <p className='flex'><div className='w-20'>Postal Code</div><span>{order.address.postal_code}</span></p>
              <p className='flex'><div className='w-20'>State</div><span>{order.address.state}</span></p>
              <p className='flex'><div className='w-20'>Country</div><span>{order.address.country}</span></p>
            </div>
            <div className=' w-full'>
              <p className='flex'><div className='w-20'>Total</div><span>{order.amount}</span></p>
              <p className='flex'><div className='w-20'>User</div><span>{order.userId.name}</span></p>
              <p className='flex'><div className='w-20'>Email</div><span>{order.userId.email}</span></p>
              <p className='flex font-semibold'><div className='w-20'>Status</div><span>{order.status}</span></p>
              <p className='flex'><div className='w-20'>Ordered On</div><span>{moment(order.createdAt).format('LL')}</span></p>
            </div>
          </div>
          <div className="w-full flex justify-evenly border-t">
            {order.status !== 'delivered' &&
              <button className=" uppercase w-full border-r hover:bg-gray-500 hover:text-white transition-all duration-200" onClick={() => { cancelOrder(order._id) }}>Cancel Order</button>
            }
            {order.status === 'delivered' &&
              <button className=" cursor-default uppercase w-full border-r bg-green-200 transition-all duration-200">Order Delivered</button>
            }
            {admin && order.status !== 'delivered' && <button className=" uppercase w-full border-r hover:bg-gray-500 hover:text-white transition-all duration-200" onClick={() => { changeOrderStatus(order.status, order._id) }} >Next Stage</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrdersTable