'use strict'
function onInit() {
    renderBooks()
    onCloseReadBook()
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map(function (book) {
        return `<tr>
                    <td class="id-body"><span class="hash">#</span><b>${book.id}</b></td>
                    <td class="title-body">${book.name}</td>
                    <td class="price-body">$${book.price}</td>
                    <td class="read-body btn"> <button onclick="onReadBook('${book.id}')">Read</button></td>
                    <td class="update-body btn"> <button onclick="onUpdateBook('${book.id}')">Update</button></td>
                    <td class="delete-body btn"> <button onclick="onRemoveBook('${book.id}')">Delete</button></td>
                </tr>`
    })
    document.querySelector('tbody').innerHTML = strHtmls.join('')
}

function renderBookInfo(bookId) {
    var books = getBooks();
    var book = books.find(book => {
        return (book.id === bookId)
    })
    var strHtml = `<div class="info-header">
    <h3>${book.name}</h3>
    <button class="info-btn" onclick="onCloseReadBook()">X</button>
    </div>
    <div class="book-info">
    <p>${book.desc}</p>
    <div class="info-rate">
     <button onclick="onchangeBookRating('${book.id}',-1)" value="-">-</button>
     <span class="rating">0</span>
     <button onclick="onchangeBookRating('${book.id}',1)" value="+">+</button>
    </div>
    </div>`
    var elNav = document.querySelector('nav')
    elNav.innerHTML = strHtml
}

function onAddBook() {
    addBook()
    renderBooks()
}

function onReadBook(bookId) {
    renderBookInfo(bookId)
    var elInfo = document.querySelector('nav')
    elInfo.classList.add('open')
}

function onCloseReadBook() {
    var elInfo = document.querySelector('nav')
    elInfo.classList.remove('open')

}

function onUpdateBook(bookId) {
    var newPrice = +prompt('Enter Book\'s new price')
    updateBook(bookId, newPrice)
    renderBooks()
}

function onRemoveBook(bookId) {
    var check = confirm('Are you sure you want to delete this book?')
    if (!check) return
    removeBook(bookId)
    renderBooks()
}

function onchangeBookRating(bookId, diff) {
    console.log(diff);
    changeBookRating(bookId, diff)
    renderBooks()
}


function onNextPage(diff) {
    movePage(diff);
    renderBooks();
}
