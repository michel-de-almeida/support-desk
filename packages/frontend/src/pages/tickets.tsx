import { useState, useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import { ticketService } from '../features/tickets/ticketService'
import { List } from '@mui/material'
import TicketItem from '../components/ticketItem'
import { ITicket } from 'support-desk-shared'
import CenterContainer from '../components/centerContainer'

interface Props {}
const Tickets = (props: Props) => {
    const emptyTicketList: ITicket[] = []
    const token = useAppSelector((state) => state.auth.user.token)
    const [ticketList, setTicketList] = useState(emptyTicketList)

    useEffect(() => {
        ;(async () => {
            const res = await ticketService.getTickets(token)
            console.log(res)

            setTicketList(res)
        })()
    }, [token])

    return (
        <CenterContainer
            children={
                <List>
                    {ticketList.map((v) => {
                        return (
                            <TicketItem
                                key={v._id}
                                ticket={v}
                            />
                        )
                    })}
                </List>
            }
            width='70%'
        />
    )
}
export default Tickets
