import { create } from "zustand"
import { persist } from "zustand/middleware"
import api from "@/lib/api/api"

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: Date
}

interface MessageState {
  messages: Message[]
  conversations: { [userId: string]: Message[] }
  isLoading: boolean
  error: string | null

  // Fetch messages
  getMessagesByConversation: (userId: string) => Promise<void>
  getAllConversations: () => Promise<void>

  // Send messages
  sendMessage: (receiverId: string, content: string) => Promise<void>

  // Utils
  clearError: () => void
  markAsRead: (messageIds: string[]) => Promise<void>
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      messages: [],
      conversations: {},
      isLoading: false,
      error: null,

      getMessagesByConversation: async (userId: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.get(`/messages/conversation/${userId}`)
          const conversationMessages = response.data

          set((state) => ({
            messages: [...state.messages],
            conversations: {
              ...state.conversations,
              [userId]: conversationMessages,
            },
            isLoading: false,
          }))
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message || "Failed to fetch conversation",
            isLoading: false,
          })
        }
      },

      getAllConversations: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.get("/messages/conversations")

          // Transform the response to group messages by conversation
          const conversations: { [userId: string]: Message[] } = {}
          response.data.forEach((conversation: any) => {
            conversations[conversation.userId] = conversation.messages
          })

          set({ conversations, isLoading: false })
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message || "Failed to fetch conversations",
            isLoading: false,
          })
        }
      },

      sendMessage: async (receiverId: string, content: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post("/messages", { receiverId, content })
          const newMessage = response.data

          set((state) => {
            // Update the conversation with the new message
            const existingConversation = state.conversations[receiverId] || []

            return {
              messages: [...state.messages, newMessage],
              conversations: {
                ...state.conversations,
                [receiverId]: [...existingConversation, newMessage],
              },
              isLoading: false,
            }
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to send message",
            isLoading: false,
          })
        }
      },

      markAsRead: async (messageIds: string[]) => {
        set({ isLoading: true, error: null })
        try {
          await api.put("/messages/read", { messageIds })

          // Update the local state to mark messages as read
          set((state) => {
            const updatedMessages = state.messages.map((message) =>
              messageIds.includes(message.id)
                ? { ...message, isRead: true }
                : message
            )

            // Also update in conversations
            const updatedConversations = { ...state.conversations }
            Object.keys(updatedConversations).forEach((userId) => {
              updatedConversations[userId] = updatedConversations[userId].map(
                (message) =>
                  messageIds.includes(message.id)
                    ? { ...message, isRead: true }
                    : message
              )
            })

            return {
              messages: updatedMessages,
              conversations: updatedConversations,
              isLoading: false,
            }
          })
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message ||
              "Failed to mark messages as read",
            isLoading: false,
          })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "message-storage",
      partialize: (state) => ({ conversations: state.conversations }),
    }
  )
)
