import { Backdrop, CircularProgress } from '@mui/material'

interface Props {
    isOpen: boolean
}
const LoadingBackdrop = ({ isOpen }: Props) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isOpen}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
    )
}
export default LoadingBackdrop
