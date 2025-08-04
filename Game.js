export class Game {
  constructor(cardData, playerNames = []) {
    this.cardData = cardData
    this.players = playerNames.map(name => new Player(name))
  }

  isGameOver() {
    return this.players.some(p => p.hand.length === 0)
  }

  getWinner() {
    return this.players.find(p => p.hand.length > 0)?.name ?? null
  }
}
