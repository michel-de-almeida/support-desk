import {
    ListItem,
    ListItemText,
    ListItemButton,
    Chip,
    Paper,
    Typography,
} from '@mui/material'
import { ITicket, TicketStatus } from 'support-desk-shared'
import { useNavigate } from 'react-router-dom'

interface Props {
    ticket: ITicket
}
const TicketItem = ({ ticket }: Props) => {
    const navigate = useNavigate()

    return (
        <Paper
            elevation={3}
            sx={{ marginBottom: 0.5 }}
        >
            <ListItem
                secondaryAction={
                    <Chip
                        label={ticket.status}
                        size='small'
                        color={
                            ticket.status === TicketStatus.Submitted
                                ? 'info'
                                : ticket.status === TicketStatus.Open
                                ? 'secondary'
                                : ticket.status === TicketStatus.Closed
                                ? 'secondary'
                                : 'default'
                        }
                    />
                }
                divider
                disablePadding
            >
                <ListItemButton
                    onClick={() => {
                        navigate(`/ticket/${ticket._id}`)
                    }}
                    sx={{ paddingY: 1 }}
                >
                    <ListItemText
                        primary={ticket.product}
                        secondary={
                            <>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component='span'
                                    variant='body2'
                                    color='text.primary'
                                >
                                    {ticket.description}
                                </Typography>
                                <div>
                                    {new Date(
                                        ticket.createdAt!
                                    ).toLocaleString()}
                                </div>
                            </>
                        }
                    />
                </ListItemButton>
            </ListItem>
        </Paper>
    )
}
export default TicketItem
