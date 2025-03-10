import { Response } from "express"
import { v4 as uuidv4 } from "uuid"
import { SseClient } from "../types"

class SseManager {
  private clients: Map<string, SseClient> = new Map()
  private userConnections: Map<string, string[]> = new Map()

  public createConnection(userId: string, res: Response): string {
    const clientId = uuidv4()

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    })

    res.write(
      `data: ${JSON.stringify({
        type: "connection",
        message: "Connected to SSE stream",
      })}\n\n`
    )

    this.clients.set(clientId, { id: clientId, userId, stream: res })

    if (!this.userConnections.has(userId)) {
      this.userConnections.set(userId, [])
    }
    this.userConnections.get(userId)?.push(clientId)

    return clientId
  }

  public closeConnection(clientId: string): void {
    if (!this.clients.has(clientId)) return

    const client = this.clients.get(clientId)!
    const userConnections = this.userConnections.get(client.userId) || []
    this.userConnections.set(
      client.userId,
      userConnections.filter((id) => id !== clientId)
    )

    this.clients.delete(clientId)
  }

  public sendToUser(userId: string, event: string, data: any): void {
    const userClientIds = this.userConnections.get(userId) || []

    userClientIds.forEach((clientId) => {
      try {
        const client = this.clients.get(clientId)
        if (client) {
          const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
          client.stream.write(message)
        }
      } catch (error) {
        this.closeConnection(clientId)
      }
    })
  }

  public broadcastToAll(event: string, data: any): void {
    this.clients.forEach((client) => {
      try {
        const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
        client.stream.write(message)
      } catch (error) {
        this.closeConnection(client.id)
      }
    })
  }

  public sendToClass(classId: string, event: string, data: any): void {
    this.clients.forEach((client) => {
      try {
        const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
        client.stream.write(message)
      } catch (error) {
        this.closeConnection(client.id)
      }
    })
  }
}

const sseManager = new SseManager()
export default sseManager
