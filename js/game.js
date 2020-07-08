import Deck from "./deck.js";

export default class Game {
    constructor(n) {
        // TODO: ensure n is even
        this._width = n;
        this._height = n;
        this._deck = new Deck(n * n);
        console.log("I was created");
        this._createBoard();
    }

    _createBoard() {
        this._board = []
        for (let i = 0; i < this._width; i++) {
            let row = []
            for (let j = 0; j < this._height; j++) {
                row.push(this._deck[i * this._width + j])
            }
            this._board.push(row);
        }
    }

    printBoard() {
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                console.log("Board: " + i + " - " + j + " card: " + this._board[i * this._width + j]);
            }
        }
    }
}