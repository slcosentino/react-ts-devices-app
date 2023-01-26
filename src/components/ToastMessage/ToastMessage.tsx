

import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useToast } from '../../hooks/use-toast';

export const ToastMessage = () => {
  const { toastConfig: { vertical, horizontal, isOpen, message, autoHideDuration, color }, setToast } = useToast();
  const handleClose = () => {
    setToast({ vertical, horizontal, isOpen: false, message, autoHideDuration, color });
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      key={vertical + horizontal}
      autoHideDuration={autoHideDuration}
    >
      <Alert severity={color} sx={{ width: '100%' }} onClose={handleClose}>
        {message}
      </Alert>

    </Snackbar>
  )
}