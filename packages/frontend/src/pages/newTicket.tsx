import { Box, Container, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import AnimatedDiv from '../components/animatedDiv'
import { RouteURLs } from '../static/enums'
import { toast } from 'react-toastify'
import { TicketService } from '../features/tickets/ticketService'

const Ticket = () => {
    const product = useRef<HTMLInputElement>(null)
    const description = useRef<HTMLInputElement>(null)
    const [isLoading, setisLoading] = useState(false)

    const navigate = useNavigate()
    const user = useAppSelector((state) => state.auth.user)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setisLoading(true)
        try {
            const res = await TicketService.setTicket(user.token, {
                _id: '',
                userId: user.id!,
                product: '',
                description: description.current?.value!,
            })
            toast.success(res.message)
            navigate(RouteURLs.Home)
        } catch (error: any) {
            console.log(error)
            setisLoading(false)
            toast.error(error as string)
        }
        setisLoading(false)
    }

    return (
        <AnimatedDiv>
            <Container
                component='main'
                maxWidth='md'
            >
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='product'
                        label='Product'
                        name='product'
                        autoFocus
                        inputRef={product}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='description'
                        label='Description'
                        id='description'
                        inputRef={description}
                    />
                    <LoadingButton
                        type='submit'
                        fullWidth
                        variant='contained'
                        size='large'
                        sx={{ mt: 3, mb: 2 }}
                        loading={isLoading}
                    >
                        Submit Ticket
                    </LoadingButton>
                </Box>
            </Container>
        </AnimatedDiv>
    )
}
export default Ticket
