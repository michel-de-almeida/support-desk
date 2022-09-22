import { LoadingButton } from '@mui/lab'
import {
    Box,
    Container,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TicketType } from 'support-desk-shared'
import AnimatedDiv from '../components/animatedDiv'
import { useSetTicketMutation } from '../generated/graphql'
import { RouteURLs } from '../static/enums'
import { toErrorMap } from '../utils/utils'
import * as yup from 'yup'

const NewTicket = () => {
    const [{ fetching }, setTicket] = useSetTicketMutation()

    //convert the enum to an object<key, value> array
    const ticketTypeArray = Object.keys(TicketType).map((key) => {
        return {
            key,
            value: TicketType[key as keyof typeof TicketType],
        }
    })

    const navigate = useNavigate()

    const validationSchema = yup.object({
        product: yup.string().required('Product is required'),
        description: yup.string().required('Description is required'),
    })

    const formik = useFormik({
        initialValues: {
            product: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setErrors }) => {
            try {
                const res = await setTicket({
                    ticket: {
                        product: values.product as TicketType,
                        description: values.description,
                    },
                })
                if (res.error) toast.error(res.error.message)
                //custom error
                if (res.data?.setTicket.errors) setErrors(toErrorMap(res.data?.setTicket.errors))
                //naviagte on success
                if (res.data?.setTicket.ticket) {
                    toast.success('Ticket created')
                    navigate(RouteURLs.Home)
                }
            } catch (error: any) {
                toast.error(error as string)
            }
        },
    })

    return (
        <AnimatedDiv>
            <Container
                component='main'
                maxWidth='md'
            >
                <Box
                    component='form'
                    onSubmit={formik.handleSubmit}
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
                    <FormControl
                        fullWidth
                        error={formik.touched.product && Boolean(formik.errors.product)}
                    >
                        <InputLabel id='select-product-label'>Product</InputLabel>
                        <Select
                            fullWidth
                            id='product'
                            name='product'
                            labelId='select-product-label'
                            label='Product'
                            value={formik.values.product}
                            onChange={formik.handleChange}
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
                        <FormHelperText>
                            {formik.touched.product && formik.errors.product}
                        </FormHelperText>
                    </FormControl>
                    <TextField
                        margin='normal'
                        multiline
                        minRows={3}
                        fullWidth
                        id='description'
                        name='description'
                        label='Please enter a description of the issue'
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
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
