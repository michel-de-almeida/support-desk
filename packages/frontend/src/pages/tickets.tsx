import { Container, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StatusChip from '../components/statusChip'
import { useGetUserTicketsQuery, Ticket, TicketStatus } from '../generated/graphql'
import BasePageLayout from '../layouts/basePageLayout'
import { RouteURLs } from '../static/enums'
import { toErrorMap } from '../utils/utils'

const Tickets = () => {
    const [{ data, error, fetching }] = useGetUserTicketsQuery()
    let ticketList: Ticket[] = []

    if (!fetching) {
        if (error) toast.error(error.message)
        if (data?.getUserTickets.errors)
            toast.error(toErrorMap(data?.getUserTickets.errors).toString())

        if (data?.getUserTickets.tickets) {
            ticketList = data?.getUserTickets.tickets as Ticket[]
            ticketList.map((v) => {
                v.createdAt = new Date(v.createdAt!).toLocaleString()
                return v
            })
        }
    }

    const naviagte = useNavigate()

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
        <BasePageLayout isPageLoading={fetching}>
            <Container sx={{ height: 400, marginTop: 8 }}>
                <Typography
                    variant='h4'
                    fontWeight={700}
                    mb={2}
                >
                    My Tickets
                </Typography>
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
        </BasePageLayout>
    )
}
export default Tickets
