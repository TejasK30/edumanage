"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  MoreVertical,
  PaperclipIcon,
  Phone,
  Plus,
  Search,
  Send,
  Video,
} from "lucide-react"
import { useState } from "react"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [messageText, setMessageText] = useState<string>("")

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "Emma Johnson",
      avatar: "/api/placeholder/32/32",
      lastMessage: "Can you share the study material for tomorrow's test?",
      timestamp: "10:30 AM",
      unread: 2,
      isOnline: true,
      type: "student",
    },
    {
      id: 2,
      name: "James Wilson",
      avatar: "/api/placeholder/32/32",
      lastMessage: "Thank you for your help with the science project.",
      timestamp: "Yesterday",
      unread: 0,
      isOnline: false,
      type: "student",
    },
    {
      id: 3,
      name: "Sarah Brown",
      avatar: "/api/placeholder/32/32",
      lastMessage: "Meeting scheduled for Friday at 2 PM.",
      timestamp: "Yesterday",
      unread: 1,
      isOnline: true,
      type: "parent",
    },
    {
      id: 4,
      name: "10th Grade Teachers",
      avatar: "/api/placeholder/32/32",
      lastMessage: "We need to discuss the upcoming field trip details.",
      timestamp: "Mar 18",
      unread: 0,
      isOnline: false,
      type: "group",
    },
    {
      id: 5,
      name: "Math Department",
      avatar: "/api/placeholder/32/32",
      lastMessage: "New curriculum guidelines have been shared.",
      timestamp: "Mar 15",
      unread: 0,
      isOnline: false,
      type: "group",
    },
  ]

  // Filter conversations based on search
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Mock messages for the selected conversation
  const currentChat = conversations.find((c) => c.id === selectedChat)

  const messages = [
    {
      id: 1,
      sender: "them",
      text: "Hello! I was wondering if you could share the study material for tomorrow's test?",
      time: "10:15 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "Hi Emma! Of course, I'm preparing the study guide right now. Is there any specific topic you're struggling with?",
      time: "10:20 AM",
    },
    {
      id: 3,
      sender: "them",
      text: "Thank you! I'm particularly having trouble with the chapter on cellular respiration.",
      time: "10:25 AM",
    },
    {
      id: 4,
      sender: "them",
      text: "Would it be possible to include some extra practice problems on that topic?",
      time: "10:25 AM",
    },
    {
      id: 5,
      sender: "me",
      text: "Absolutely! I'll make sure to include additional problems on cellular respiration. I'll also add some diagrams that might help visualize the process better.",
      time: "10:28 AM",
    },
    {
      id: 6,
      sender: "them",
      text: "That would be perfect. Thank you so much for your help!",
      time: "10:30 AM",
    },
  ]

  // Handle sending a message
  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      setMessageText("")
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with students, parents, and colleagues
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-14rem)]">
        <Card className="col-span-1 flex flex-col h-full">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Conversations</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                New Chat
              </Button>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <Tabs defaultValue="all" className="px-4">
            <TabsList className="mb-2 w-full">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Unread
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex-1">
                Groups
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <ScrollArea className="h-[calc(100vh-21rem)]">
                <div className="space-y-2">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-accent ${
                        selectedChat === conv.id ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedChat(conv.id)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conv.avatar} alt={conv.name} />
                          <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conv.isOnline && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-start">
                          <div className="font-medium truncate">
                            {conv.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {conv.timestamp}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {conv.lastMessage}
                        </div>
                      </div>
                      {conv.unread > 0 && (
                        <Badge className="ml-2" variant="destructive">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="unread" className="mt-0">
              <ScrollArea className="h-[calc(100vh-21rem)]">
                <div className="space-y-2">
                  {filteredConversations
                    .filter((conv) => conv.unread > 0)
                    .map((conv) => (
                      <div
                        key={conv.id}
                        className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-accent ${
                          selectedChat === conv.id ? "bg-accent" : ""
                        }`}
                        onClick={() => setSelectedChat(conv.id)}
                      >
                        <Avatar>
                          <AvatarImage src={conv.avatar} alt={conv.name} />
                          <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3 flex-1 overflow-hidden">
                          <div className="flex justify-between items-start">
                            <div className="font-medium truncate">
                              {conv.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {conv.timestamp}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {conv.lastMessage}
                          </div>
                        </div>
                        <Badge className="ml-2" variant="destructive">
                          {conv.unread}
                        </Badge>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="groups" className="mt-0">
              <ScrollArea className="h-[calc(100vh-21rem)]">
                <div className="space-y-2">
                  {filteredConversations
                    .filter((conv) => conv.type === "group")
                    .map((conv) => (
                      <div
                        key={conv.id}
                        className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-accent ${
                          selectedChat === conv.id ? "bg-accent" : ""
                        }`}
                        onClick={() => setSelectedChat(conv.id)}
                      >
                        <Avatar>
                          <AvatarImage src={conv.avatar} alt={conv.name} />
                          <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3 flex-1 overflow-hidden">
                          <div className="flex justify-between items-start">
                            <div className="font-medium truncate">
                              {conv.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {conv.timestamp}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {conv.lastMessage}
                          </div>
                        </div>
                        {conv.unread > 0 && (
                          <Badge className="ml-2" variant="destructive">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>

        {selectedChat ? (
          <Card className="col-span-2 flex flex-col h-full">
            <CardHeader className="border-b pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9 mr-2">
                    <AvatarImage
                      src={currentChat?.avatar}
                      alt={currentChat?.name}
                    />
                    <AvatarFallback>
                      {currentChat?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {currentChat?.name}
                    </CardTitle>
                    {currentChat?.isOnline && (
                      <p className="text-xs text-muted-foreground">Online</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-0 flex flex-col">
              <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.sender === "them" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage
                            src={currentChat?.avatar}
                            alt={currentChat?.name}
                          />
                          <AvatarFallback>
                            {currentChat?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`rounded-lg p-3 max-w-md ${
                            message.sender === "me"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {message.text}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <PaperclipIcon className="h-5 w-5" />
                  </Button>
                  <Textarea
                    placeholder="Type your message..."
                    className="flex-grow min-h-[40px] resize-none"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="col-span-2 flex items-center justify-center">
            <CardContent className="text-center p-6">
              <div className="mx-auto rounded-full bg-muted h-12 w-12 flex items-center justify-center mb-4">
                <Send className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a chat from the list to start messaging
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
