'use strict'
const KEY = 'books';
const PAGE_SIZE = 8;
var gPageIdx = 0;
var gBooks;

var gBookNames = ['Clean Code', 'Think Like A Programer', 'Practical C Programing', 'iOS Programing'];

_createBooks()

function getPage() {
    return gPageIdx + 1;
}

function _createBook(name, price = getRandomIntInclusive(19, 100)) {
    return {
        id: makeId(),
        name: name,
        author: 'Aviv Ben Shahar',
        price: price,
        desc: makeLorem(),
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < 24; i++) {
            var book = gBookNames[getRandomIntInclusive(0, gBookNames.length - 1)]
            books.push(_createBook(book))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function addBook() {
    var name = prompt('Enter Book Name')
    var price = prompt('Enter Book Price')
    var book = _createBook(name, price)
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(book => {
        return book.id === bookId
    })
    console.log(book);
    book.price = newPrice
    _saveBooksToStorage();
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book => {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function movePage(diff) {
    diff = +diff
    if (gPageIdx * PAGE_SIZE === 0 && diff === -1) return
    gPageIdx += diff;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) return gPageIdx--
}


function moveToPage(idx) {
    gPageIdx = idx;
    renderBooks()
}

function changeBookRating(bookId, diff) {
    diff = +diff
    if (book.rate + diff > 10 || book.rate + diff <= 0) return;
    book.rate += diff;
}

function getBooks() {
    var books = gBooks
    var startIdx = gPageIdx * PAGE_SIZE;
    return books.slice(startIdx, PAGE_SIZE + startIdx)
}

function getBookNames() {
    return gBookNames
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}