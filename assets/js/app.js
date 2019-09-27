var $boardContainer = document.querySelector('.container');

var board = new Board();

function handleListCreate() {
  var listTitle = prompt('New list title') || '';

  if (listTitle.trim()) {
    board.addList(listTitle);
    renderBoard();
  }
}

function handleCardCreate(event) {
  var $listContainer = event.target.parentElement;
  var listId = Number($listContainer.getAttribute('data-id'));

  var cardText = prompt('Card content') || '';

  if (cardText.trim()) {
    board.addCard(listId, cardText);
    renderBoard();
  }
}

function handleListEdit(event) {
  var $listContainer = event.target.parentNode.parentNode;
  var listId = Number($listContainer.getAttribute('data-id'));

  var newTitle = prompt('New title') || '';

  if (newTitle.trim()) {
    board.editList(listId, newTitle);
    renderBoard();
  }
}

function handleCardEdit(event) {
  var $listContainer = event.target.parentNode.parentNode.parentNode;
  var listId = Number($listContainer.getAttribute('data-id'));
  var $cardLi = event.target.parentNode;
  var cardId = Number($cardLi.getAttribute('data-id'));

  var newText = prompt('New card text') || '';

  if (newText.trim()) {
    board.editCard(listId, cardId, newText);
    renderBoard();
  }
}

function renderBoard() {
  $boardContainer.innerHTML = '';

  board.lists.forEach( function(list) {
    var $listContainer = document.createElement('div');
    $listContainer.className = 'list';
    $listContainer.setAttribute('data-id', list.id);

    var $header = document.createElement('header');

    var $headerButton = document.createElement('button');
    $headerButton.textContent = list.title;
    $headerButton.addEventListener('click', handleListEdit);

    var $addCardButton = document.createElement('button');
    $addCardButton.textContent = 'Add a card...';
    $addCardButton.addEventListener('click', handleCardCreate);

    var $cardUl = document.createElement('ul');

    list.cards.forEach( function(card) {
      var $cardLi = document.createElement('li');
      $cardLi.setAttribute('data-id', card.id);

      var $cardButton = document.createElement('button');
      $cardButton.textContent = card.text;
      $cardButton.addEventListener('click', handleCardEdit);

      $cardLi.appendChild($cardButton);
      $cardUl.appendChild($cardLi);
    });

    $header.appendChild($headerButton);
    $listContainer.appendChild($header);
    $listContainer.appendChild($cardUl);
    $listContainer.appendChild($addCardButton);
    $boardContainer.appendChild($listContainer);
  });

  var $addListContainer = document.createElement('div');
  $addListContainer.className = 'list add';

  var $addListButton = document.createElement('button');
  $addListButton.textContent = '+ Add another list';
  $addListButton.addEventListener('click', handleListCreate);

  $addListContainer.appendChild($addListButton);
  $boardContainer.appendChild($addListContainer);
}

renderBoard();
