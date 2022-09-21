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
import { Role, useGetTicketQuery } from '../generated/graphql'
import BasePageLayout from '../layouts/basePageLayout'
import { toErrorMap } from '../utils/utils'

interface Props {}
const Ticket = (props: Props) => {
    const { token, _id, roles } = useAppSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const { ticketId } = useParams()
    const [{ data, error, fetching }] = useGetTicketQuery({ variables: { ticketId: ticketId! } })
    const ticket = data?.getTicket.ticket

    const emptyNoteList: INote[] = []

    const note = useRef<HTMLInputElement>(null)

    if (!fetching) {
        if (error) toast.error(error.message)
        if (data?.getTicket.errors) toast.error(toErrorMap(data?.getTicket.errors).toString())
        if (ticket?.userDoc._id !== _id || !roles.includes(Role.Admin)) {
            toast.error('Invalid permissions to view this ticket')
            navigate(-1)
        }
    }

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
        ticket?.status = TicketStatus.Closed
        const updatedTicketRes = await TicketService.updateTicket(ticket)
        if (updatedTicketRes.success) {
            toast.success('Ticket Closed')
            toggleConfirmPopup()
        } else toast.error(updatedTicketRes.message)
    }

    return (
        <BasePageLayout isPageLoading={fetching}>
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
                    <StatusChip status={ticket?.status} />
                </Stack>
                <Stack
                    spacing={1}
                    mt={3}
                >
                    <Typography variant='h6'>TicketID: {ticket?._id}</Typography>
                    <Typography variant='h6'>
                        Date Submitted: {new Date(ticket?.createdAt!).toLocaleString('en-ZA')}
                    </Typography>
                    <Typography variant='h6'>Product: {ticket?.product}</Typography>
                    <Divider />
                    <Card sx={{ padding: 1.5 }}>
                        <Typography variant='h6'>Description of the issue </Typography>
                        <Typography
                            variant='body2'
                            mt={1}
                        >
                            {ticket?.description}
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
                    {ticket?.status !== TicketStatus.Closed ? (
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
                    {ticket?.notes?.length! > 0 ? (
                        <List>
                            {ticket?.notes!.map((v) => {
                                return (
                                    <NoteItem
                                        key={}
                                        note={}
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
