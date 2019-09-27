/*jshint esversion: 6 */

class Card {
  constructor(text) {
    this.text = text;
    this.id = ++Card.lastID;
  }
}

Card.lastID = 0;

class List {
  constructor(title) {
    this.title = title;
    this.cards = [];
    this.id = ++List.lastID;
  }

  addCard(text) {
    var card = new Card(text);
    this.cards.push(card);
  }

  findCard(cardId) {
    return this.cards.find(card => card.id === cardId);
  }
}

List.lastID = 0;

class Board {
  constructor() {
    this.lists = [];
    this.id = ++Board.lastID;
  }

  addList(text) {
    var list = new List(text);
    this.lists.push(list);
  }

  findList(listId) {
    return this.lists.find(list => list.id === listId);
  }

  editList(listId, newTitle) {
    var list = this.findList(listId);

    if (list) {
      list.title = newTitle;
    }
  }

  addCard(listId, cardText) {
    var list = this.findList(listId);

    if (list) {
      list.addCard(cardText);
    }
  }

  findCard(cardId) {
    return this.lists.find(list => list.find(card => card.id === cardId));
  }

  editCard(listId, cardId, newText) {
    var list = this.findList(listId);
    var card = list.findCard(cardId);

    if (card) {
      card.text = newText;
    }
  }
}

Board.lastID = 0;
