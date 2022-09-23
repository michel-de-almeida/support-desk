import { Container } from '@mui/material'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppSelector } from './app/hooks'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/header'
import { darkTheme, lightTheme } from './theme'
import AnimatedRoutes from './app/animatedRoutes'
import { createClient, Provider as URQLProvider, gql, fetchExchange, dedupExchange } from 'urql'
import { LocalStorageKeys } from './static/enums'
import { cacheExchange, query } from '@urql/exchange-graphcache'
import { LoginMutation, MeDocument, MeQuery, RegisterMutation } from './generated/graphql'

const client = createClient({
    url: 'http://localhost:5000/graphql',
    fetchOptions: {
        credentials: 'include',
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            updates: {
                Mutation: {
                    login: (result: LoginMutation, _args, cache, _info) => {
                        cache.updateQuery({ query: MeDocument }, (data: MeQuery | null) => {
                            if (result.login.errors) {
                                return data
                            } else {
                                return {
                                    me: result.login.user!,
                                }
                            }
                        })
                    },
                    register: (result: RegisterMutation, _args, cache, _info) => {
                        cache.updateQuery({ query: MeDocument }, (data: MeQuery | null) => {
                            if (result.register.errors) {
                                return data
                            } else {
                                return {
                                    me: result.register.user!,
                                }
                            }
                        })
                    },
                },
            },
        }),
        fetchExchange,
    ],
})

function App() {
    const themeState = useAppSelector((state) => state.theme)

    const meQuery = gql`
        query {
            me {
                _id
            }
        }
    `

    let currentTheme = themeState.useDark ? darkTheme : lightTheme

    //rewrites the userId if it is changed
    client
        .query(meQuery, {})
        .toPromise()
        .then((result) => {
            const ls = localStorage.getItem(LocalStorageKeys.User)
            if (ls && JSON.parse(ls).userId !== result?.data?.me?._id!) {
                localStorage.setItem(
                    LocalStorageKeys.User,
                    JSON.stringify({ userId: result?.data?.me?._id! })
                )
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
