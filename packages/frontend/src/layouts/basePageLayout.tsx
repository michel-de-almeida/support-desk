import { Container } from '@mui/material'
import { ReactNode } from 'react'
import AnimatedDiv from '../components/animatedDiv'
import LoadingBackdrop from '../components/loadingBackdrop'

interface Props {
    isPageLoading: boolean
    children: ReactNode
}
const BasePageLayout = ({ isPageLoading, children }: Props) => {
    if (isPageLoading) {
        return <LoadingBackdrop isOpen={true} />
    }

    return (
        <AnimatedDiv>
            <Container
                component='main'
                maxWidth='md'
            >
                {children}
            </Container>
        </AnimatedDiv>
    )
}
export default BasePageLayout
