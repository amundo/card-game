import './components/game-table/GameTable.js'
import { games } from './games/index.js'

const response = await fetch('./cards/index.json')
const cardData = await response.json()
const gameTable = document.querySelector('game-table')
const result = document.getElementById('result')
const gameSelect = document.getElementById('game-select')
const startButton = document.getElementById('start-button')

let game = null

startButton.onclick = async () => {
  const selected = gameSelect.value
  const modulePath = `./games/${selected}/${capitalize(selected)}Game.js`
  const { [`${capitalize(selected)}Game`]: GameClass } = await import(modulePath)

  game = new GameClass(cardData)
  result.textContent = ''
  render()
}

function render() {
  if (!game) return
  const state = game.getState()
  if (!state || !state.players) {
    console.warn("Game state is invalid:", state)
    return
  }

  gameTable.data = state
  result.textContent = game.getWinner()
    ? `Game over! Winner: ${game.getWinner()}`
    : state.lastResult
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}
