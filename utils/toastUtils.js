import Toast from 'react-native-toast-message'

export const showSuccessToast = (title, message) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    duration: 3000,
    topOffset: 50,
  })
}

export const showErrorToast = (title, message) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    duration: 4000,
    topOffset: 50,
  })
}

export const showInfoToast = (title, message) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    duration: 3000,
    topOffset: 50,
  })
}
