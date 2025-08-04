export class GameTable extends HTMLElement {
  set data(state) {
    this.innerHTML = `
      <h2>${state.playerName}'s Hand</h2>
      <div class="hand">
        ${state.hand.map(card => `
          <img class="card" src="cards/${card.svgUrl}" alt="${card.text}" title="${card.text}">
        `).join('')}
      </div>
    `
  }

  connectedCallback() {
    this.style.display = 'block'
  }
}

customElements.define('game-table', GameTable)
