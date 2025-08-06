/*

Index of games available in the framework.
Each game should export a class with the same name as the file.

This file is imported by GameRoom.js and server.js. 

*/

import { WarGame } from './war/WarGame.js'

export const games = {
  war: WarGame
}
