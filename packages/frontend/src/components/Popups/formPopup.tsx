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
import { RefObject } from 'react'

interface Props {
    title: string
    content: string
    inputlabel: string
    inputMinRows?: string | number | undefined
    inputRef: RefObject<HTMLInputElement>
    rejectButtonText: string
    acceptButtonText: string
    isOpen: boolean
    onAccept: () => void
    onReject: () => void
    onClose: () => void
}
const FormPopup = (props: Props) => {
    const isMultiline = props.inputMinRows ? true : false
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
                <DialogContentText mb={2}>{props.content}</DialogContentText>
                <TextField
                    autoFocus
                    id='popup-input'
                    inputRef={props.inputRef}
                    label={props.inputlabel}
                    multiline={isMultiline}
                    minRows={props.inputMinRows}
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
