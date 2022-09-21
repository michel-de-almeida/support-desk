import { Card, Stack, Typography } from '@mui/material'
import { Note } from '../generated/graphql'

interface Props {
    note: Note
}
const NoteItem = ({ note }: Props) => {
    return (
        <Card
            variant='outlined'
            sx={{ padding: 1.5, marginBottom: 0.5 }}
        >
            <Stack spacing={0.2}>
                <Typography variant='h6'>Note from {note.createdBy.username}</Typography>
                <Typography
                    variant='body2'
                    mt={1}
                >
                    {note.noteText}
                </Typography>
                <Typography variant='body2'>
                    {new Date(note.createdAt).toLocaleString('en-US')}
                </Typography>
            </Stack>
        </Card>
    )
}
export default NoteItem
