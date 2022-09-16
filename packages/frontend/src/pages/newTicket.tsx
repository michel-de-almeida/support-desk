import { LoadingButton } from '@mui/lab'
import {
    Box,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TicketType } from 'support-desk-shared'
import { useAppSelector } from '../app/hooks'
import AnimatedDiv from '../components/animatedDiv'
import { TicketService } from '../features/tickets/ticketService'
import { RouteURLs } from '../static/enums'

const NewTicket = () => {
    const [product, setProduct] = useState('')
    const description = useRef<HTMLInputElement>(null)
    const [isLoading, setisLoading] = useState(false)
    const ticketTypeArray = Object.values(TicketType)

    const navigate = useNavigate()
    const user = useAppSelector((state) => state.auth.user)

    const handleSelectChange = (event: SelectChangeEvent) => {
        setProduct(event.target.value)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setisLoading(true)

        const res = await TicketService.setTicket({
            userId: user.id!,
            product: product,
            description: description.current?.value!,
        })

        if (res.success) {
            toast.success(res.message)
            navigate(RouteURLs.Home)
        } else {
            toast.error(res.message)
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
                    mt={8}
                >
                    <Typography
                        variant={'h2'}
                        fontWeight={700}
                    >
                        <Stack
                            direction={'row'}
                            alignContent='center'
                            justifyContent='center'
                            mb={1}
                        >
                            Create a new ticket
                        </Stack>
                    </Typography>
                    <Typography
                        variant={'h4'}
                        fontWeight={700}
                        color={'#828282'}
                    >
                        <Stack
                            direction={'row'}
                            alignContent='center'
                            justifyContent='center'
                            mb={2}
                        >
                            Please fill out the form below
                        </Stack>
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id='select-product-label'>Product</InputLabel>
                        <Select
                            required
                            fullWidth
                            id='product'
                            labelId='select-product-label'
                            label='Product'
                            value={product}
                            onChange={handleSelectChange}
                        >
                            {ticketTypeArray.map((v) => {
                                return (
                                    <MenuItem
                                        key={v}
                                        value={v}
                                    >
                                        {v}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <TextField
                        margin='normal'
                        multiline
                        minRows={3}
                        required
                        fullWidth
                        name='description'
                        label='Please enter a description of the issue'
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
export default NewTicket
