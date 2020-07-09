import * as cs from './constants.js';
import Deck from './deck.js';
import Card from './card.js';

export default class Game {
    constructor(n) {
        // TODO: ensure n is even
        this._width = n;
        this._height = n;
        this._numAttempts = 0;
        this._visibileCards = [];
        this._deck = new Deck(n * n);
        this.createBoard();
    }

    createBoard() {
        this._deck.shuffle();
        this._board = [];
        for (let i = 0; i < this._width; i++) {
            const row = [];
            for (let j = 0; j < this._height; j++) {
                row.push(this._deck.getCard(i * this._width + j));
            }
            this._board.push(row);
        }
    }

    render() {
        const gameDiv = document.getElementById('board');
        for (let i = 0; i < this._board.length; i++) {
            for (let j = 0; j < this._board[i].length; j++) {
                const card = this._board[i][j];
                gameDiv.appendChild(card.render());
                this.bindCard(card);
            }
        }
        return gameDiv;
    }

    bindCard(card) {
        // TODO don't let user click the same card again
        card.bindEvent('click', () => {
            if (this._visibileCards.includes(card) || !(card instanceof Card)) {
                return;
            }
            this._visibileCards.push(card);
            card.toggleVisibility();
            if (this._visibileCards.length === cs.MAX_ATTEMPTS) {
                this.checkMatch();
            }
        });
    }

    checkMatch() {
        if (this._visibileCards.length === 0) {
            return false;
        }

        const value = this._visibileCards[0].getValue();
        for (let i = 1; i < this._visibileCards.length; i++) {
            if (this._visibileCards[i].getValue() !== value) {
                return false;
            }
        }
        return true;
    }

    printBoard() {
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                const card = this._board[i][j];
                console.log(`Board: ${i} - ${j} card: ${card.getValue()}`);
            }
        }
    }
}
