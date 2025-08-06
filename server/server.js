// server/server.js
import { GameRoom } from "./GameRoom.js"
import { serveDir } from 'jsr:@std/http'


const gameRoom = new GameRoom({gameName: "war"})

Deno.serve(async req => {
  const { pathname } = new URL(req.url)

  if (pathname === "/ws") {
    const { socket, response } = Deno.upgradeWebSocket(req)
    const url = new URL(req.url)
    const roomId = url.searchParams.get("room") || "default"
    const gameName = url.searchParams.get("game") || "war"
    const username = url.searchParams.get("user") || "anon"

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new GameRoom(roomId, gameName))
    }

    rooms.get(roomId).addPlayer(socket, username)
    return response
  }

  return serveDir(req, {
    fsRoot: new URL('../public', import.meta.url).pathname,
    showIndex: true,
    showDirListing: true
  })
  
})

function handleSocket(socket) {
  socket.onopen = () => gameRoom.addClient(socket)
  socket.onmessage = (e) => gameRoom.receive(socket, e.data)
  socket.onclose = () => gameRoom.removeClient(socket)
}
