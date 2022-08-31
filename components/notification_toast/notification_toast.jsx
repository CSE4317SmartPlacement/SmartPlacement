


import { Alert, Snackbar } from '@mui/material'
import React from 'react'

function NotificationToast({ message, onClose }) {
    return (
        <Snackbar
            open={message != null}
            autoHideDuration={1000}
            onClose={onClose}>
            <Alert severity='success' onClose={onClose} >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default NotificationToast