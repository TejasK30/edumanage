import { useState } from "react"
import { Bell } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { NotificationPanel } from "@/components/NotificationPanel"
import {
  useNotifications,
  useUnreadCount,
} from "@/hooks/useNotificationService"
import { Badge } from "./ui/badge"

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: unreadData } = useUnreadCount()
  const unreadCount = unreadData?.count || 0

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-Neutrals/neutrals-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue-500"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6 text-Neutrals/neutrals-8" />
        {unreadCount > 0 && (
          <Badge
            variant="info"
            className="absolute -top-1 -right-1 px-1.5 min-w-[20px] h-5 flex items-center justify-center"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-Neutrals/neutrals-11 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <NotificationPanel onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
