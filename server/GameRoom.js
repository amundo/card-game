import { games } from '../public/games/index.js'


let cardDataUrl = new URL("../public/cards/index.json", import.meta.url) 
let response = await fetch(cardDataUrl.href)
if(!response.ok) {
  throw new Error(`Failed to fetch card data: ${response.statusText}`)
} 
let cardData = await response.json()



export class GameRoom {
  constructor({id=crypto.randomUUID(), gameName = 'war'}) {
console.log(`Creating GameRoom with id=${id} and gameName=${gameName}`)
    if (!gameName) throw new Error("GameRoom requires a gameName")

    this.id = id ?? crypto.randomUUID()

    const Game = games[gameName]

    if (!Game) throw new Error(`Game not found: ${gameName}`)

    this.game = new Game(cardData)
console.log(`GameRoom created for ${gameName} with ID ${this.id}`)
    this.gameName = gameName

    this.players = []
    this.chatHistory = []
  }

  addPlayer(socket, username) {
    this.players.push({ socket, username })
    socket.onmessage = (e) => this.handleMessage(socket, e)
    this.sendTo(socket, { type: 'joined', game: this.gameName, room: this.id })
    this.broadcastChat(`${username} joined.`)
  }

  handleMessage(socket, e) {
    const msg = JSON.parse(e.data)
    if (msg.type === 'chat') {
      this.broadcastChat(msg.text, this.getUsername(socket))
    } else if (msg.type === 'play') {
      this.game.playRound()
      this.broadcast({ type: 'state', data: this.game.getState() })
    }
  }

  getUsername(socket) {
    return this.players.find(p => p.socket === socket)?.username || "unknown"
  }

  broadcast(msg) {
    const str = JSON.stringify(msg)
    for (const { socket } of this.players) {
      socket.send(str)
    }
  }

  sendTo(socket, msg) {
    socket.send(JSON.stringify(msg))
  }

  broadcastChat(text, from = 'system') {
    const entry = { type: 'chat', from, text }
    this.chatHistory.push(entry)
    this.broadcast(entry)
  }
}
