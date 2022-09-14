import { Container } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import AnimatedDiv from '../components/animatedDiv'

interface Props {}
const Ticket = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { ticketId } = useParams()
    return (
        <AnimatedDiv>
            <Container
                component='main'
                maxWidth='md'
            ></Container>
        </AnimatedDiv>
    )
}
export default Ticket
