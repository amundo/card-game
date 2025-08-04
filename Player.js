export class Player {
  constructor(name) {
    this.name = name
    this.hand = []
  }

  drawFrom(deck, count = 5) {
    this.hand.push(...deck.draw(count))
  }
}
