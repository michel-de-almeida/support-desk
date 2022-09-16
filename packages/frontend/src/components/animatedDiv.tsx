import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}
const AnimatedDiv = ({ children }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {children}
        </motion.div>
    )
}
export default AnimatedDiv
