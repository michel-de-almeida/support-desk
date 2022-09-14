import { motion } from 'framer-motion'

interface Props {
    children: JSX.Element
}
const AnimatedDiv = ({ children }: Props) => {
    return (
        <motion.div
            children={children}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        ></motion.div>
    )
}
export default AnimatedDiv
