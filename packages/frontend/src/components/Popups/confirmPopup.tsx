import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

interface Props {
    title: string
    content: string
    rejectButtonText: string
    acceptButtonText: string
    isOpen: boolean
    onAccept: () => void
    onReject: () => void
    onClose: () => void
}
const ConfirmPopup = (props: Props) => {
    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
            fullWidth
            maxWidth='sm'
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
                <DialogContentText>{props.content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onReject}>{props.rejectButtonText}</Button>
                <Button onClick={props.onAccept}>{props.acceptButtonText}</Button>
            </DialogActions>
        </Dialog>
    )
}
export default ConfirmPopup
