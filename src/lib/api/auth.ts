export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to log in")
    }

    return await response.json()
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" }
  }
}
