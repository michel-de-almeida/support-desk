import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { ITicket } from 'support-desk-shared'
import { useAppSelector } from '../app/hooks'
import AnimatedDiv from '../components/animatedDiv'
import { TicketService } from '../features/tickets/ticketService'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface Props {}
const NewTicket = (props: Props) => {
    const token = useAppSelector((state) => state.auth.user.token)
    const emptyTicket: ITicket = {
        userId: '',
        product: '',
        description: '',
    }
    const { ticketId } = useParams()
    const [ticket, setTicket] = useState(emptyTicket)

    useEffect(() => {
        ;(async () => {
            const res = await TicketService.getTicket(token, ticketId!)
            const ticket = res.payload as ITicket
            if (res.success) {
                setTicket(ticket)
            } else toast.error(res.message)
        })()
    }, [token, ticketId])

    return (
        <AnimatedDiv>
            <Container
                component='main'
                maxWidth='md'
            >
                <div>{ticket.product}</div>
            </Container>
        </AnimatedDiv>
    )
}
export default NewTicket
