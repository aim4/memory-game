import * as cs from './constants.js';
import Card from './card.js';

export default class Deck {
    constructor(n) {
        this._cards = Deck.createDeck(n);
    }

    static createDeck(n) {
        const cards = [];
        for (let i = 0; i < Math.floor(n / 2); i++) {
            cards.push(new Card(i));
            cards.push(new Card(i));
        }
        return cards;
    }

    resetDeck() {
        this.shuffle();
        this._cards.forEach((card) => {
            card.setStatus(cs.HIDDEN_VISIBILITY);
        });
    }

    shuffle() {
        // Fisher-Yates Algorithm
        for (let i = this._cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this._cards[j].getValue();
            this._cards[j].setValue(this._cards[i].getValue());
            this._cards[i].setValue(temp);
        }
    }

    render() {
        const div = document.createElement('div');
        div.classList.add(cs.DECK_CLASS);
        for (let i = 0; i < this._cards.length; i++) {
            const card = this._cards[i].render();
            div.appendChild(card);
        }
        return div;
    }

    getCard(i) {
        return this._cards[i];
    }

    getLength() {
        return this._cards.length;
    }
}
