import { Game } from '../../core/Game.js'
import { Deck } from '../../core/Deck.js'
import { Player } from '../../core/Player.js'

export class WarGame {
    constructor(cardData) {

        const fullDeck = new Deck(cardData)
        fullDeck.shuffle()


        this.players = [
            new Player("Player 1"),
            new Player("Player 2")
        ]

        this.player1 = this.players[0]
        this.player2 = this.players[1]

        // Deal half deck to each
        this.player1.hand = fullDeck.draw(26)
        this.player2.hand = fullDeck.draw(26)

        this.battlePile = [] // cards in play
        this.lastResult = ""
    }
    

    async loadCardData() {
        const response = await fetch('../cards/index.json')
        if (!response.ok) {
            throw new Error(`Failed to load card data: ${response.statusText}`)
        }
        const cardData = await response.json()
        this.deck = new Deck(cardData)
        console.log("Card data loaded:", cardData)
    }

    playRound() {
        console.log(`playing round…`)
        const { player1, player2 } = this

        const card1 = player1.draw()
        const card2 = player2.draw()

        if (!card1 || !card2) {
            this.lastResult = "Game over"
            return
        }

        this.battlePile = [card1, card2]

        const winner =
            this.compare(card1, card2) > 0 ? player1 :
                this.compare(card1, card2) < 0 ? player2 :
                    null // tie (war)

        if (winner) {
            winner.addCards(this.battlePile)
            this.lastResult = `${winner.name} wins the round`
        } else {
            this.lastResult = "War! (not yet implemented)"
        }

        this.battlePile = []
    }


    playTurn() {
        const p1Card = this.player1.hand.shift()
        const p2Card = this.player2.hand.shift()

        this.battlePile.push(p1Card, p2Card)

        const winner = this.compare(p1Card, p2Card)

        if (winner === 1) {
            this.player1.hand.push(...this.battlePile)
            this.lastResult = `Player 1 wins with ${p1Card.rank} vs ${p2Card.rank}`
            this.battlePile = []
        } else if (winner === 2) {
            this.player2.hand.push(...this.battlePile)
            this.lastResult = `Player 2 wins with ${p2Card.rank} vs ${p1Card.rank}`
            this.battlePile = []
        } else {
            this.lastResult = `WAR! ${p1Card.rank} vs ${p2Card.rank}`
        }
    }

    compare(card1, card2) {
        const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        const r1 = rankOrder.indexOf(card1.rank)
        const r2 = rankOrder.indexOf(card2.rank)
        if (r1 > r2) return 1
        if (r2 > r1) return 2
        return 0
    }

    getState() {
        return {
            lastResult: this.lastResult,
            players: this.players.map(p => ({
                name: p.name,
                cardCount: p.hand.length,
                topCard: p.hand[0]
            })),
            battlePile: [...this.battlePile],
        }
    }


    isGameOver() {
        return this.player1.hand.length === 0 || this.player2.hand.length === 0
    }

    getWinner() {
        if (this.player1.hand.length === 0) return this.player2.name
        if (this.player2.hand.length === 0) return this.player1.name
        return null
    }
}
