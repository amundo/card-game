
export class GameTable extends HTMLElement {
  #state = null
  async connectedCallback() {

  }

  set data(state) {
    this.#state = state
    this.render()
  }

  render(){
      this.innerHTML= this.#state.players.map(p => `
      <h2>${p.name} (${p.cardCount} cards)</h2>
      ${p.topCard ? `<img class="card" src="cards/${p.topCard.svgUrl}">` : ''}
    `).join('') + `
      <h3>Battle pile (${this.#state.battlePile.length} cards)</h3>
      <div class="pile">
        ${this.#state.battlePile.map(c => `<img class="card" src="cards/${c.svgUrl}">`).join('')}
      </div>
    `

  }
}

customElements.define('game-table', GameTable)
