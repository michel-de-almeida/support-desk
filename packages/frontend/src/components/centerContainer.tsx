import { Box, Container } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    width: string
}
const CenterContainer = ({ children, width }: Props) => {
    return (
        <Container>
            <Box
                children={children}
                ml={'auto'}
                mr={'auto'}
                mt={2}
                width={width}
            ></Box>
        </Container>
    )
}
export default CenterContainer
