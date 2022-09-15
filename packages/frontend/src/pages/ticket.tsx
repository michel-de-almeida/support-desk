import { Add as AddIcon } from '@mui/icons-material'
import { Button, Card, Container, Divider, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ITicket } from 'support-desk-shared'
import { useAppSelector } from '../app/hooks'
import AnimatedDiv from '../components/animatedDiv'
import ConfirmPopup from '../components/Popups/confirmPopup'
import FormPopup from '../components/Popups/formPopup'
import StatusChip from '../components/statusChip'
import { TicketService } from '../features/tickets/ticketService'

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
    const note = useRef<HTMLInputElement>(null)

    useEffect(() => {
        ;(async () => {
            const res = await TicketService.getTicket(token, ticketId!)
            const ticket = res.payload as ITicket
            if (res.success) {
                setTicket(ticket)
            } else toast.error(res.message)
        })()
    }, [token, ticketId])

    //Note popup
    const [showNotePopup, setshowNotePopup] = useState(false)
    const toggleNotePopup = () => {
        setshowNotePopup(!showNotePopup)
    }

    const handleNoteSave = () => {
        toggleNotePopup()
    }

    const handleNoteClose = () => {
        toggleNotePopup()
    }

    //Confirm popup
    const [showConfirmPopup, setshowConfirmPopup] = useState(false)
    const toggleConfirmPopup = () => {
        setshowConfirmPopup(!showConfirmPopup)
    }

    const handleConfirmSave = () => {
        toggleConfirmPopup()
    }

    const handleConfirmClose = () => {
        toggleConfirmPopup()
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
                        padding: 2,
                    }}
                    variant='outlined'
                >
                    <Stack
                        justifyContent='center'
                        alignItems='center'
                        spacing={2}
                    >
                        <Typography
                            variant='h4'
                            fontWeight={700}
                        >
                            Ticket Details
                        </Typography>
                        <StatusChip status={ticket.status} />
                    </Stack>
                    <Stack
                        spacing={1}
                        mt={3}
                    >
                        <Typography variant='h6'>TicketID: {ticket._id}</Typography>
                        <Typography variant='h6'>
                            Date Submitted: {new Date(ticket.createdAt!).toLocaleString('en-ZA')}
                        </Typography>
                        <Typography variant='h6'>Product: {ticket.product}</Typography>
                        <Divider />
                        <Card sx={{ padding: 1.5 }}>
                            <Typography variant='h6'>Description of the issue </Typography>
                            <Typography
                                variant='body2'
                                mt={1}
                            >
                                {ticket.description}
                            </Typography>
                        </Card>
                    </Stack>
                </Card>
                <Card
                    sx={{
                        marginTop: 2,
                        padding: 2,
                    }}
                    variant='outlined'
                >
                    <Stack spacing={1}>
                        <Typography
                            variant='h4'
                            fontWeight={700}
                        >
                            Notes
                        </Typography>
                        <div>
                            <Button
                                variant='contained'
                                startIcon={<AddIcon />}
                                onClick={toggleNotePopup}
                            >
                                Add Notes
                            </Button>
                        </div>
                    </Stack>
                </Card>
                <Button
                    variant='contained'
                    color='error'
                    sx={{ marginTop: 3 }}
                    fullWidth
                    onClick={toggleConfirmPopup}
                >
                    Close Ticket
                </Button>

                <FormPopup
                    title={'New Note'}
                    content={''}
                    inputlabel={'Enter a Note'}
                    inputRef={note}
                    inputMinRows={3}
                    rejectButtonText={'Cancel'}
                    acceptButtonText={'Save'}
                    isOpen={showNotePopup}
                    onAccept={handleNoteSave}
                    onReject={handleNoteClose}
                    onClose={toggleNotePopup}
                />
                <ConfirmPopup
                    title={'Close Ticket'}
                    content={'Are you sure you want to close this ticket?'}
                    rejectButtonText={'Cancel'}
                    acceptButtonText={'Confirm'}
                    isOpen={showConfirmPopup}
                    onAccept={handleConfirmSave}
                    onReject={handleConfirmClose}
                    onClose={toggleConfirmPopup}
                />
            </Container>
        </AnimatedDiv>
    )
}
export default Ticket
