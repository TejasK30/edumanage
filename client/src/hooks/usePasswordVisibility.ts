import { useState } from "react"

function usePasswordVisibility() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  return {
    passwordVisible,
    confirmPasswordVisible,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  }
}

export default usePasswordVisibility
