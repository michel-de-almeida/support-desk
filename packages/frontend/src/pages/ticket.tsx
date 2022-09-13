import { ITicket } from 'support-desk-shared'
import CenterContainer from '../components/centerContainer'

interface Props {
    ticket: ITicket
}
const Ticket = ({ ticket }: Props) => {
    return (
        <CenterContainer
            width='70%'
            children={<></>}
        ></CenterContainer>
    )
}
export default Ticket
