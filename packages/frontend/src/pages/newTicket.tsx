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
import AnimatedDiv from '../components/animatedDiv'
import { useSetTicketMutation } from '../generated/graphql'
import { RouteURLs } from '../static/enums'
import { toErrorMap } from '../utils/utils'

const NewTicket = () => {
    const [product, setProduct] = useState('')
    const description = useRef<HTMLInputElement>(null)
    const [{ fetching }, setTicket] = useSetTicketMutation()

    //convert the enum to an object<key, value> array
    const ticketTypeArray = Object.keys(TicketType).map((key) => {
        return {
            key,
            value: TicketType[key as keyof typeof TicketType],
        }
    })

    const navigate = useNavigate()

    const handleSelectChange = (event: SelectChangeEvent) => {
        setProduct(event.target.value)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await setTicket({
                ticket: {
                    product: product as TicketType,
                    description: description.current?.value!,
                },
            })
            if (res.error) toast.error(res.error.message)
            //custom error
            if (res.data?.setTicket.errors)
                toast.error(toErrorMap(res.data?.setTicket.errors).toString())
            //naviagte on success
            if (res.data?.setTicket.ticket) {
                toast.success('Ticket created')
                navigate(RouteURLs.Home)
            }
        } catch (error: any) {
            toast.error(error as string)
        }
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
                                        key={v.key}
                                        value={v.key}
                                    >
                                        {v.value}
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
                        loading={fetching}
                    >
                        Submit Ticket
                    </LoadingButton>
                </Box>
            </Container>
        </AnimatedDiv>
    )
}
export default NewTicket
