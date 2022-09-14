import { useState, useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import { TicketService } from '../features/tickets/ticketService'
import { Container, Link, Chip } from '@mui/material'
import { ITicket, TicketStatus } from 'support-desk-shared'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { RouteURLs } from '../static/enums'
import AnimatedDiv from '../components/animatedDiv'

const Tickets = () => {
    const emptyTicketList: ITicket[] = []
    const token = useAppSelector((state) => state.auth.user.token)
    const [ticketList, setTicketList] = useState(emptyTicketList)

    const naviagte = useNavigate()

    useEffect(() => {
        ;(async () => {
            const res = await TicketService.getTickets(token)
            res.map((v) => {
                v.createdAt = new Date(v.createdAt!).toLocaleString()
                return v
            })

            setTicketList(res)
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
                <Chip
                    label={params.value}
                    size='small'
                    color={
                        params.value === TicketStatus.Submitted
                            ? 'info'
                            : params.value === TicketStatus.Open
                            ? 'secondary'
                            : params.value === TicketStatus.Closed
                            ? 'secondary'
                            : 'default'
                    }
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
