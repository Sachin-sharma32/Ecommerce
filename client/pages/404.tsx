import Head from 'next/head'
import React from 'react'
import Smooth from '../utils/smooth'

const NotFound = () => {
  return (
    <Smooth className=' bg-blue-100 min-h-screen flex justify-center items-center text-sm font-bold text-blue-700'>
       <Head>
                <title>Myntra - page not found</title>
                <link rel="icon" type="image/png" href="https://cdn4.vectorstock.com/i/thumb-large/14/33/cross-mark-icon-x-sign-simple-error-design-false-vector-40051433.jpg" />
                <meta
                    name="description"
                    content="The only online store you will need to fulfill all your needs"
                />
            </Head>
      404 | PAGE NOT FOUND
    </Smooth>
  )
}
export default NotFound