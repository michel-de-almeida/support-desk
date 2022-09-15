import { Button, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { ITicket } from 'support-desk-shared'
import { useAppSelector } from '../app/hooks'
import AnimatedDiv from '../components/animatedDiv'
import { TicketService } from '../features/tickets/ticketService'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormPopup from '../components/formPopup'

interface Props {}
const Ticket = (props: Props) => {
    const token = useAppSelector((state) => state.auth.user.token)
    const emptyTicket: ITicket = {
        userId: '',
        product: '',
        description: '',
    }
    const { ticketId } = useParams()
    const [ticket, setTicket] = useState(emptyTicket)
    const [showMemoPopup, setshowMemoPopup] = useState(false)

    useEffect(() => {
        ;(async () => {
            const res = await TicketService.getTicket(token, ticketId!)
            const ticket = res.payload as ITicket
            if (res.success) {
                setTicket(ticket)
            } else toast.error(res.message)
        })()
    }, [token, ticketId])

    const toggleMemoPopup = () => {
        setshowMemoPopup(!showMemoPopup)
    }

    const handleMemoSave = () => {
        toggleMemoPopup()
    }

    const handleMemoClose = () => {
        toggleMemoPopup()
    }

    return (
        <AnimatedDiv>
            <Container
                component='main'
                maxWidth='md'
            >
                <Button
                    variant='contained'
                    onClick={toggleMemoPopup}
                >
                    Click me
                </Button>
                <FormPopup
                    title={'Poes'}
                    content={'Yo ma se poes'}
                    inputlabel={'your poes'}
                    rejectButtonText={'Cancel'}
                    acceptButtonText={'Save'}
                    isOpen={showMemoPopup}
                    onAccept={handleMemoSave}
                    onReject={handleMemoClose}
                    onClose={toggleMemoPopup}
                />
            </Container>
        </AnimatedDiv>
    )
}
export default Ticket
