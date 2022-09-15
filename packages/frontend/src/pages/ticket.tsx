import { Container, Typography, Box, Stack, Card, Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { ITicket } from 'support-desk-shared'
import { useAppSelector } from '../app/hooks'
import AnimatedDiv from '../components/animatedDiv'
import { TicketService } from '../features/tickets/ticketService'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormPopup from '../components/formPopup'
import StatusChip from '../components/statusChip'

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
    const memo = useRef<HTMLInputElement>(null)

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
                <Card
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    variant='outlined'
                >
                    <Stack
                        direction='row'
                        justifyContent='center'
                        alignItems='center'
                        spacing={2}
                        mt={2}
                    >
                        <Typography variant='h4'>TicketID: {ticket._id}</Typography>
                        <StatusChip status={ticket.status} />
                    </Stack>
                    <Stack
                        spacing={1}
                        mt={3}
                    >
                        <Typography variant='h5'>
                            <Stack direction='row'>
                                Product:&nbsp;
                                <Typography
                                    variant='h6'
                                    color={'GrayText'}
                                >
                                    {ticket.product}
                                </Typography>
                            </Stack>
                        </Typography>
                        <Typography variant='h5'>
                            <Stack direction='row'>
                                Description:&nbsp;
                                <Typography
                                    variant='h6'
                                    color={'GrayText'}
                                >
                                    {ticket.description}
                                </Typography>
                            </Stack>
                        </Typography>
                    </Stack>
                </Card>
                <Button onClick={toggleMemoPopup}>Click me</Button>
                <FormPopup
                    title={'Memo'}
                    content={''}
                    inputlabel={'Enter a Memo'}
                    inputRef={memo}
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
