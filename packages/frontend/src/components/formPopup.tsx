import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

interface Props {
    title: string
    content: string
    inputlabel: string
    rejectButtonText: string
    acceptButtonText: string
    isOpen: boolean
    onAccept: () => void
    onReject: () => void
    onClose: () => void
}
const FormPopup = (props: Props) => {
    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
        >
            <DialogTitle>
                {props.title}{' '}
                <IconButton
                    aria-label='close'
                    onClick={props.onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>{props.content}</DialogContentText>
                <TextField
                    autoFocus
                    id='popup-input'
                    label={props.inputlabel}
                    fullWidth
                    variant='outlined'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onReject}>{props.rejectButtonText}</Button>
                <Button onClick={props.onAccept}>{props.acceptButtonText}</Button>
            </DialogActions>
        </Dialog>
    )
}
export default FormPopup
