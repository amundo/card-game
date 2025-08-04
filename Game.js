import { Deck } from './Deck.js'
import { Player } from './Player.js'

export class Game {
  constructor(cardData, playerName = 'You') {
    this.deck = new Deck(cardData)
    this.deck.shuffle()
    this.player = new Player(playerName)
    this.player.drawFrom(this.deck, 5)
  }

  getState() {
    return {
      playerName: this.player.name,
      hand: this.player.hand.map(card => ({
        text: card.toString(),
        svgUrl: card.svgUrl
      }))
    }
  }
}
