import { Add as AddIcon } from '@mui/icons-material'
import { Button, Card, Divider, List, Stack, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import NoteItem from '../components/noteItem'
import ConfirmPopup from '../components/Popups/confirmPopup'
import FormPopup from '../components/Popups/formPopup'
import StatusChip from '../components/statusChip'
import {
    TicketStatus,
    useGetTicketQuery,
    useSetTicketNoteMutation,
    useUpdateTicketMutation,
} from '../generated/graphql'
import BasePageLayout from '../layouts/basePageLayout'
import { toErrorMap } from '../utils/utils'

interface Props {}
const Ticket = (props: Props) => {
    const { ticketId } = useParams()
    const [{ data, error, fetching }] = useGetTicketQuery({ variables: { ticketId: ticketId! } })
    const [, setTicketNote] = useSetTicketNoteMutation()
    const ticket = data?.getTicket.ticket
    const [, updateTicket] = useUpdateTicketMutation()

    const note = useRef<HTMLInputElement>(null)

    if (!fetching) {
        if (error) toast.error(error.message)
        if (data?.getTicket.errors) toast.error(toErrorMap(data?.getTicket.errors).toString())
    }

    //Note popup
    const [showNotePopup, setshowNotePopup] = useState(false)
    const toggleNotePopup = () => {
        setshowNotePopup(!showNotePopup)
    }

    const handleNoteSave = async () => {
        try {
            const res = await setTicketNote({ note: note.current?.value!, ticketId: ticketId! })
            //server error
            if (res.error) toast.error(res.error.message)
            //custom error
            if (res.data?.setTicketNote.errors)
                toast.error(toErrorMap(res.data?.setTicketNote.errors).toString())
            //naviagte on success
            if (res.data?.setTicketNote.ticket) {
                toast.success('Note added.')
            }
        } catch (error: any) {
            toast.error(error as string)
        }
        toggleNotePopup()
    }

    //Confirm popup
    const [showConfirmPopup, setshowConfirmPopup] = useState(false)
    const toggleConfirmPopup = () => {
        setshowConfirmPopup(!showConfirmPopup)
    }

    const handleCloseTicket = async () => {
        try {
            const res = await updateTicket({
                ticket: { id: data?.getTicket.ticket?._id!, status: TicketStatus.Closed },
            })

            //server error
            if (res.error) toast.error(res.error.message)
            //custom error
            if (res.data?.updateTicket.errors)
                toast.error(toErrorMap(res.data?.updateTicket.errors).toString())
            //naviagte on success
            if (res.data?.updateTicket.ticket) {
                toast.success('Ticket closed.')
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error as string)
        }
        toggleConfirmPopup()
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
                            {ticket?.notes!.map((note) => {
                                return (
                                    <NoteItem
                                        key={note._id}
                                        note={note}
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
            {ticket?.status !== TicketStatus.Closed ? (
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
                onAccept={handleCloseTicket}
                onReject={toggleConfirmPopup}
                onClose={toggleConfirmPopup}
            />
        </BasePageLayout>
    )
}

export default Ticket
