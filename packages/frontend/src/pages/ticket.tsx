import { Add as AddIcon } from '@mui/icons-material'
import { Button, Card, Divider, List, Stack, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '../app/hooks'
import NoteItem from '../components/noteItem'
import ConfirmPopup from '../components/Popups/confirmPopup'
import FormPopup from '../components/Popups/formPopup'
import StatusChip from '../components/statusChip'
import {
    Role,
    TicketStatus,
    useGetTicketQuery,
    useMeQuery,
    useSetTicketNoteMutation,
    useUpdateTicketMutation,
} from '../generated/graphql'
import BasePageLayout from '../layouts/basePageLayout'
import { toErrorMap } from '../utils/utils'

interface Props {}
const Ticket = (props: Props) => {
    //route parameters
    const { ticketId } = useParams()

    //graphQL hooks
    const [, setTicketNote] = useSetTicketNoteMutation()
    const [, updateTicket] = useUpdateTicketMutation()
    const [{ data: ticketData, error, fetching: isTicketFetching }] = useGetTicketQuery({
        variables: { ticketId: ticketId! },
    })
    const [{ data: meData, fetching: isMeFetching }] = useMeQuery()

    //inputs
    const note = useRef<HTMLInputElement>(null)

    //router
    const navigate = useNavigate()

    //redux
    const { user } = useAppSelector((state) => state.auth)

    if (!isTicketFetching && !isMeFetching) {
        if (error) toast.error(error.message)
        if (ticketData?.getTicket.errors)
            toast.error(toErrorMap(ticketData?.getTicket.errors).toString())

        if (
            ticketData?.getTicket.ticket?.userDoc._id !== user._id &&
            !meData?.me.roles.includes(Role.Admin)
        ) {
            toast.error('Invalid permissions to view this screen')
            navigate(-1)
        }
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
                ticket: { id: ticketData?.getTicket.ticket?._id!, status: TicketStatus.Closed },
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
        <BasePageLayout isPageLoading={isTicketFetching}>
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
                    <StatusChip status={ticketData?.getTicket.ticket?.status} />
                </Stack>
                <Stack
                    spacing={1}
                    mt={3}
                >
                    <Typography variant='h6'>
                        TicketID: {ticketData?.getTicket.ticket?._id}
                    </Typography>
                    <Typography variant='h6'>
                        Date Submitted:{' '}
                        {new Date(ticketData?.getTicket.ticket?.createdAt!).toLocaleString('en-ZA')}
                    </Typography>
                    <Typography variant='h6'>
                        Product: {ticketData?.getTicket.ticket?.product}
                    </Typography>
                    <Divider />
                    <Card sx={{ padding: 1.5 }}>
                        <Typography variant='h6'>Description of the issue </Typography>
                        <Typography
                            variant='body2'
                            mt={1}
                        >
                            {ticketData?.getTicket.ticket?.description}
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
                    {ticketData?.getTicket.ticket?.status !== TicketStatus.Closed ? (
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
                    {ticketData?.getTicket.ticket?.notes?.length! > 0 ? (
                        <List>
                            {ticketData?.getTicket.ticket?.notes!.map((note) => {
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
            {ticketData?.getTicket.ticket?.status !== TicketStatus.Closed ? (
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
