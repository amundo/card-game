export class Card {
  constructor(suit, rank, svgUrl) {
    this.suit = suit
    this.rank = rank
    this.svgUrl = svgUrl
  }

  toString() {
    return `${this.rank} of ${this.suit}`
  }
}
