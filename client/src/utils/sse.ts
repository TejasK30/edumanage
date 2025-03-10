import { useNotificationStore } from "@/store/notificationStore"
import { useEffect, useRef } from "react"

interface SseOptions {
  onOpen?: () => void
  onError?: (error: Event) => void
  onMessage?: (event: MessageEvent) => void
}

export const useSseConnection = (options?: SseOptions) => {
  const eventSourceRef = useRef<EventSource | null>(null)
  const setIsConnected = useNotificationStore((state) => state.setIsConnected)
  const addNotification = useNotificationStore((state) => state.addNotification)

  useEffect(() => {
    const connect = () => {
      const token = localStorage.getItem("token")
      if (!token) return

      const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/sse?token=${token}`
      const eventSource = new EventSource(url)

      eventSource.onopen = () => {
        setIsConnected(true)
        options?.onOpen?.()
      }

      eventSource.onerror = (error) => {
        console.error("SSE connection error:", error)
        setIsConnected(false)
        options?.onError?.(error)

        eventSource.close()
        setTimeout(connect, 5000)
      }

      eventSource.addEventListener("connection", (event) => {
        const data = JSON.parse(event.data)
        console.log("SSE connected:", data)
      })

      eventSource.addEventListener("new_notification", (event) => {
        const notification = JSON.parse(event.data)
        console.log("New notification received:", notification)
        addNotification({
          ...notification,
          isRead: false,
        })

        if (notification.isImportant) {
          playNotificationSound()
        }

        options?.onMessage?.(event)
      })

      eventSourceRef.current = eventSource
    }

    connect()

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        setIsConnected(false)
      }
    }
  }, [addNotification, setIsConnected, options])

  return {
    isConnected: useNotificationStore((state) => state.isConnected),
    disconnect: () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        setIsConnected(false)
      }
    },
  }
}

let audioContext: AudioContext | null = null

const playNotificationSound = () => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)()
    }

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.type = "sine"
    oscillator.frequency.value = 400
    gainNode.gain.value = 0.1

    oscillator.start()

    setTimeout(() => {
      oscillator.stop()
    }, 150)
  } catch (error) {
    console.error("Error playing notification sound:", error)
  }
}
