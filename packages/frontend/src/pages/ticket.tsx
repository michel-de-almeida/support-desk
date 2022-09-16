import { Add as AddIcon } from '@mui/icons-material'
import { Button, Card, Divider, List, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { INote, ITicket, TicketStatus } from 'support-desk-shared'
import { useAppSelector } from '../app/hooks'
import NoteItem from '../components/noteItem'
import ConfirmPopup from '../components/Popups/confirmPopup'
import FormPopup from '../components/Popups/formPopup'
import StatusChip from '../components/statusChip'
import { NoteService } from '../features/notes/noteService'
import { TicketService } from '../features/tickets/ticketService'
import BasePageLayout from '../layouts/basePageLayout'

interface Props {}
const Ticket = (props: Props) => {
    const { token, id, isAdmin } = useAppSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const emptyTicket: ITicket = {
        userId: '',
        product: '',
        description: '',
    }
    const emptyNoteList: INote[] = []

    const { ticketId } = useParams()
    const [ticket, setTicket] = useState(emptyTicket)
    const note = useRef<HTMLInputElement>(null)
    const [noteList, setnoteList] = useState(emptyNoteList)
    const [isPageLoading, setisPageLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            const getTicketRes = await TicketService.getTicket(ticketId!)
            const ticket = getTicketRes.payload as ITicket
            const noteList = await NoteService.getNotesByTicketId(ticketId!)
            setisPageLoading(false)

            //Only the user that submitted the ticket or an admin can view the ticket
            if (ticket.userId === id || isAdmin) {
                if (getTicketRes.success) {
                    setTicket(ticket)
                    if (noteList.success) {
                        setnoteList(noteList.payload)
                    } else toast.error(noteList.message)
                } else toast.error(getTicketRes.message)
            } else {
                toast.error('Invalid permissions to view this ticket')
                navigate(-1)
            }
        })()
    }, [token, id, isAdmin, ticketId, navigate])

    //Note popup
    const [showNotePopup, setshowNotePopup] = useState(false)
    const toggleNotePopup = () => {
        setshowNotePopup(!showNotePopup)
    }

    const handleNoteSave = async () => {
        await NoteService.setNote({ ticketId: ticketId!, noteText: note.current?.value! })
        const noteListResponse = await NoteService.getNotesByTicketId(ticketId!)
        setnoteList(noteListResponse.payload)
        toast.success('Note Added')
        toggleNotePopup()
    }

    //Confirm popup
    const [showConfirmPopup, setshowConfirmPopup] = useState(false)
    const toggleConfirmPopup = () => {
        setshowConfirmPopup(!showConfirmPopup)
    }

    const handleConfirmSave = async () => {
        ticket.status = TicketStatus.Closed
        const updatedTicketRes = await TicketService.updateTicket(ticket)
        if (updatedTicketRes.success) {
            toast.success('Ticket Closed')
            toggleConfirmPopup()
        } else toast.error(updatedTicketRes.message)
    }

    return (
        <BasePageLayout isPageLoading={isPageLoading}>
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
                    {ticket.status !== TicketStatus.Closed ? (
                        <div>
                            <Button
                                variant='contained'
                                startIcon={<AddIcon />}
                                onClick={toggleNotePopup}
                            >
                                Add Notes
                            </Button>
                        </div>
                    ) : null}
                    {noteList.length > 0 ? (
                        <List>
                            {noteList.map((v) => {
                                return (
                                    <NoteItem
                                        key={v._id}
                                        note={v}
                                    ></NoteItem>
                                )
                            })}
                        </List>
                    ) : (
                        <Typography
                            variant='h6'
                            textAlign='center'
                            color={'GrayText'}
                        >
                            {' '}
                            No notes to show
                        </Typography>
                    )}
                </Stack>
            </Card>
            {ticket.status !== TicketStatus.Closed ? (
                <Button
                    variant='contained'
                    color='error'
                    sx={{ marginTop: 3 }}
                    fullWidth
                    onClick={toggleConfirmPopup}
                >
                    Close Ticket
                </Button>
            ) : null}

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
                onReject={toggleNotePopup}
                onClose={toggleNotePopup}
            />
            <ConfirmPopup
                title={'Close Ticket'}
                content={'Are you sure you want to close this ticket?'}
                rejectButtonText={'Cancel'}
                acceptButtonText={'Confirm'}
                isOpen={showConfirmPopup}
                onAccept={handleConfirmSave}
                onReject={toggleConfirmPopup}
                onClose={toggleConfirmPopup}
            />
        </BasePageLayout>
    )
}
export default Ticket
