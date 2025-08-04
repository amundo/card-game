// deno run --allow-read --allow-write generate-index.js

const suitDirs = ['clubs', 'diamonds', 'hearts', 'spades']
const suitSymbols = {
  clubs: '♣',
  diamonds: '♦',
  hearts: '♥',
  spades: '♠',
}

const rankMap = {
  '1': 'A',
  'a': 'A',
  'j': 'J',
  'q': 'Q',
  'k': 'K'
}

const entries = []

for (const suit of suitDirs) {
  const files = await Array.fromAsync(Deno.readDir(suit))

  for (const file of files) {
    if (!file.isFile || !file.name.endsWith('.svg')) continue

    const match = file.name.match(/^(\d+|[ajkq])\w?\.svg$/i)
    if (!match) continue

    const rawRank = match[1].toLowerCase()
    const rank = rankMap[rawRank] || rawRank
    const path = `${suit}/${file.name}`

    entries.push({
      suit,
      rank,
      unicodeSymbol: suitSymbols[suit],
      url: path
    })
  }
}

entries.sort((a, b) => {
  const suitOrder = suitDirs.indexOf(a.suit) - suitDirs.indexOf(b.suit)
  if (suitOrder !== 0) return suitOrder
  return a.rank.localeCompare(b.rank, undefined, { numeric: true })
})

await Deno.writeTextFile('index.json', JSON.stringify(entries, null, 2))
console.log(`✅ Wrote index.json with ${entries.length} cards`)
