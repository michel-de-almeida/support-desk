import { HelpOutline as HelpOutlineIcon, Support as SupportIcon } from '@mui/icons-material'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AnimatedDiv from '../components/animatedDiv'
import { RouteURLs } from '../static/enums'

const Home = () => {
    const navigate = useNavigate()

    return (
        <AnimatedDiv>
            <Container
                component='main'
                maxWidth='md'
            >
                <Box mt={8}>
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
                            startIcon={<HelpOutlineIcon />}
                            onClick={() => {
                                navigate(RouteURLs.NewTicket)
                            }}
                        >
                            Create New Ticket
                        </Button>
                        <Button
                            fullWidth
                            variant='contained'
                            size='large'
                            startIcon={<SupportIcon />}
                            onClick={() => {
                                navigate(RouteURLs.Tickets)
                            }}
                        >
                            View My Tickets
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </AnimatedDiv>
    )
}
export default Home
