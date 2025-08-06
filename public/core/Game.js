export class Game {
  constructor(cardData, playerNames = []) {
    this.cardData = cardData
    this.players = playerNames.map(name => new Player(name))
  }

  /**
   * Check if the game is over
   * @returns {boolean}
   */
  isGameOver() {
    return this.players.some(p => p.hand.length === 0)
  }

  /**
   * Get the value of a card based on its rank
   * @param {*} card 
   * @returns 
   */
  value(card) {
    const rankMap = {
      "1": 14, // Ace
      "k": 13,
      "q": 12,
      "j": 11,
      "10": 10,
      "9": 9,
      "8": 8,
      "7": 7,
      "6": 6,
      "5": 5,
      "4": 4,
      "3": 3,
      "2": 2
    }
    return rankMap[card.rank] ?? 0
  }

  /**
   * Compare two cards using game-defined valuation
   */
  compare(cardA, cardB) {
    return this.value(cardA) - this.value(cardB)
  }

  getWinner() {
    return this.players.find(p => p.hand.length > 0)?.name ?? null
  }
}
