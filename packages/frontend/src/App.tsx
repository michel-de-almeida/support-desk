import { Container } from '@mui/material'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from './app/hooks'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/header'
import { darkTheme, lightTheme } from './theme'
import AnimatedRoutes from './app/animatedRoutes'
import { createClient, Provider as URQLProvider, OperationResult } from 'urql'
import { MeQuery, MeDocument } from './generated/graphql'
import { setUser } from './redux/auth/authSlice'

const client = createClient({
    url: 'http://localhost:5000/graphql',
    fetchOptions: {
        credentials: 'include',
    },
})

// updates: {
//     Mutation: {
//         login: (result: LoginMutation, _args, cache, _info) => {
//             cache.updateQuery({ query: MeDocument }, (data: MeQuery | null) => {
//                 if (result.login.errors) {
//                     return data
//                 } else {
//                     return {
//                         me: result.login.user!,
//                     }
//                 }
//             })
//         },
//         register: (result: RegisterMutation, _args, cache, _info) => {
//             cache.updateQuery({ query: MeDocument }, (data: MeQuery | null) => {
//                 if (result.register.errors) {
//                     return data
//                 } else {
//                     return {
//                         me: result.register.user!,
//                     }
//                 }
//             })
//         },
//     },
// },

function App() {
    const themeState = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    let currentTheme = themeState.useDark ? darkTheme : lightTheme

    //run the 'me' query
    client
        .query(MeDocument, {})
        .toPromise()
        .then((result: OperationResult<MeQuery>) => {
            //populate the AuthState if it has results
            if (result.data?.me) {
                dispatch(setUser(result.data.me))
            }
        })

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Container fixed>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />

                <Router>
                    <URQLProvider value={client}>
                        <Header />
                        <AnimatedRoutes />
                    </URQLProvider>
                </Router>
                <ToastContainer
                    position='top-center'
                    theme={currentTheme.palette.mode}
                    autoClose={2000}
                />
            </Container>
        </ThemeProvider>
    )
}

export default App
