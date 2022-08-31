import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import { dangerColor } from '../../utils/colors'

function ErrorDialog({ errorTitle, errorMessage, onClose }) {
  return (<Modal
    open={errorMessage != null}
    onClose={onClose}>
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }}>
      <Typography variant="h6" component="h2">
        {errorTitle}
      </Typography>
      <Typography sx={{ mt: 2, color: dangerColor }}>
        {errorMessage}
      </Typography>
    </Box>
  </Modal>
  )
}

export default ErrorDialog