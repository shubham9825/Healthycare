import toast from 'react-hot-toast'

export const showToast = (
    message = 'Something went wrong',
    messageType = 'error',
) =>
    toast(message, {
        type: messageType
    })
