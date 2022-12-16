import React from 'react'
import { motion } from 'framer-motion'

const ErrorModel = (props) => {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className=" fixed top-0 left-1/2 -translate-x-1/2 bg-red-500 p-4 rounded-sm text-white z-50">
      {props.children}
    </motion.div>
  )
}

export default ErrorModel