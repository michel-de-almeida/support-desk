import { Container } from '@mui/material'
import AnimatedDiv from '../components/animatedDiv'

interface Props {}
const NewTicket = (props: Props) => {
    return (
        <AnimatedDiv>
            <Container
                component='main'
                maxWidth='md'
            ></Container>
        </AnimatedDiv>
    )
}
export default NewTicket
