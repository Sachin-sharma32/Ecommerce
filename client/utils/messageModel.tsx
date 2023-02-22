import React from "react";
import { motion } from "framer-motion";

const MessageModel = (props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className=" p-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-yellow-500 rounded-lg text-white z-40"
        >
            {props.children}
        </motion.div>
    );
};

export default MessageModel;
