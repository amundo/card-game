import { Card } from './Card.js'

export class Deck {
  constructor(cardData) {
    this.cards = cardData.map(({ suit, rank, url }) => new Card(suit, rank, url))
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }

  draw(n = 1) {
    return this.cards.splice(0, n)
  }
}
