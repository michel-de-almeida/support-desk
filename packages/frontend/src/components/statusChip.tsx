import { Chip } from '@mui/material'
import { TicketStatus } from 'support-desk-shared'

interface Props {
    status: TicketStatus | undefined
    size?: 'small' | 'medium' | undefined
}
const StatusChip = ({ status, size }: Props) => {
    size = size ? size : (size = 'medium')
    return (
        <Chip
            label={status}
            size={size}
            color={
                status === TicketStatus.Submitted
                    ? 'info'
                    : status === TicketStatus.Open
                    ? 'secondary'
                    : status === TicketStatus.Closed
                    ? 'secondary'
                    : 'default'
            }
        />
    )
}
export default StatusChip
