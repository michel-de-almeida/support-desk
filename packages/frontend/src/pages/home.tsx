import { Typography, Stack, Box, Button, Container } from '@mui/material'
import {
    HelpOutline as HelpOutlineIcon,
    Support as SupportIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { RouteURLs } from '../static/enums'
import AnimatedDiv from '../components/animatedDiv'

interface Props {}
const Home = (props: Props) => {
    const navigate = useNavigate()

    return (
        <AnimatedDiv>
            <Container>
                <Box
                    ml={'auto'}
                    mr={'auto'}
                    mt={2}
                    width={'70%'}
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
                            What do you need help with?
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
                            Please choose from an option below
                        </Stack>
                    </Typography>
                    <Stack spacing={2}>
                        <Button
                            fullWidth
                            variant='outlined'
                            size='large'
                            onClick={() => {
                                navigate(RouteURLs.NewTicket)
                            }}
                        >
                            <HelpOutlineIcon sx={{ marginRight: '2px' }} />
                            Create New Ticket
                        </Button>
                        <Button
                            fullWidth
                            variant='contained'
                            size='large'
                            onClick={() => {
                                navigate(RouteURLs.Tickets)
                            }}
                        >
                            <SupportIcon sx={{ marginRight: '2px' }} />
                            View My Tickets
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </AnimatedDiv>
    )
}
export default Home