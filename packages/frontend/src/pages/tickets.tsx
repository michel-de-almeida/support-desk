import { Container, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ITicket, TicketStatus } from 'support-desk-shared'
import { useAppSelector } from '../app/hooks'
import AnimatedDiv from '../components/animatedDiv'
import StatusChip from '../components/statusChip'
import { TicketService } from '../features/tickets/ticketService'
import { RouteURLs } from '../static/enums'

const Tickets = () => {
    const emptyTicketList: ITicket[] = []
    const token = useAppSelector((state) => state.auth.user.token)
    const [ticketList, setTicketList] = useState(emptyTicketList)

    const naviagte = useNavigate()

    useEffect(() => {
        ;(async () => {
            const res = await TicketService.getUserTickets(token)
            const tickets = res.payload as ITicket[]

            if (res.success) {
                tickets.map((v) => {
                    v.createdAt = new Date(v.createdAt!).toLocaleString()
                    return v
                })
                setTicketList(tickets)
            } else toast.error(res.message)
        })()
    }, [token])

    const columns: GridColDef[] = [
        {
            field: 'product',
            headerName: 'Product',
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams<string>) => (
                <strong>
                    <Link
                        href=''
                        onClick={() => {
                            naviagte(`${RouteURLs.Ticket}/${params.id}`)
                        }}
                    >
                        {params.value}
                    </Link>
                </strong>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Submitted On',
            flex: 1,
            disableColumnMenu: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams<string>) => (
                <StatusChip
                    status={params.value as TicketStatus}
                    size='small'
                />
            ),
        },
    ]

    return (
        <AnimatedDiv>
            <Container
                component='main'
                maxWidth='md'
                sx={{ height: 400, marginTop: 8 }}
            >
                <DataGrid
                    rows={ticketList}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row._id}
                    disableSelectionOnClick
                />
                {/* <List>
                {ticketList.map((v) => {
                    return (
                        <TicketItem
                            key={v._id}
                            ticket={v}
                        />
                    )
                })}
            </List> */}
            </Container>
        </AnimatedDiv>
    )
}
export default Tickets
