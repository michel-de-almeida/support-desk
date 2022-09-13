import { useNavigate, useParams } from 'react-router-dom'
import CenterContainer from '../components/centerContainer'
import { useAppDispatch } from '../app/hooks'

interface Props {}
const Ticket = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { ticketId } = useParams()
    return (
        <CenterContainer
            width='70%'
            children={<></>}
        ></CenterContainer>
    )
}
export default Ticket
