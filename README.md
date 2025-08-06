---
title: A Card Game framework
author: Patrick Hall
---

<https://github.com/amundo/card-game>


```
├── public
│   ├── components
│   │   └── game-table
│   │       ├── game-table.html
│   │       └── GameTable.js
│   ├── core
│   │   ├── Card.js
│   │   ├── Deck.js
│   │   ├── Game.js
│   │   └── Player.js
│   ├── games
│   │   ├── hearts
│   │   ├── index.js
│   │   ├── uno
│   │   └── war
│   │       └── WarGame.js
│   ├── index.html
│   ├── main.js
│   └── network.js
├── README.md
├── server
│   ├── GameRoom.js
│   └── server.js
└── tree.txt
```

## ai

<https://chatgpt.com/c/6890cc27-bde0-8333-92c6-7ad038d7181b>

## game rooms

trying to get GameRoom functionality kind of like gameboardarena working, haven't grokked it. 

```
pathall@icon card-game % deno -A server/server.js
Creating GameRoom with id=1c6e946a-0ad9-4705-bfd4-a9aad36b164b and gameName=war
GameRoom created for war with ID 1c6e946a-0ad9-4705-bfd4-a9aad36b164b
Listening on http://0.0.0.0:8000/ (http://localhost:8000/)
```

## dev log

last left off trying to get war to work

a basic framework is in place; cards render, pretty neat. 

joker and card back are missing.

game-table is kind of weird, doesn't do much. (no render()! )


Not sure that `games` should be imported in both `GameRoom.js` and `server.js`.

`main.js` is weird, an ai artefact. 