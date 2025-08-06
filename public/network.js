const socket = new WebSocket(`ws://${location.host}/ws`)

socket.addEventListener("open", () => {
  console.log("Connected to game server")
})

socket.addEventListener("message", e => {
  const msg = JSON.parse(e.data)
  if (msg.type === "init" || msg.type === "state") {
    gameTable.data = msg.state
    result.textContent = msg.state.lastResult
  } else if (msg.type === "chat") {
    console.log(`[${msg.from}]: ${msg.text}`)
  }
})

document.getElementById("next-turn").onclick = () => {
  socket.send(JSON.stringify({ type: "play-turn" }))
}
