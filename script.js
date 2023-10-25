// Get the UI elements
let form = document.querySelector('#book-form');


// Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

//UI Class
class UI {
    constructor() {
        
    }
    addToBookList(book) {
        //My manual Solution which works
        // let list = document.querySelector('#book-list');
        // let bookInfo = document.createElement('tr');
        // let bookName = document.createElement('td');
        // let authorName = document.createElement('td');
        // let isbnId = document.createElement('td');
        // bookName.appendChild(document.createTextNode(`${book.title}`));
        // authorName.appendChild(document.createTextNode(`${book.author}`));
        // isbnId.appendChild(document.createTextNode(`${book.isbn}`));
        // bookInfo.appendChild(bookName);
        // bookInfo.appendChild(authorName);
        // bookInfo.appendChild(isbnId);
        // list.appendChild(bookInfo);

        //Bohubrihi Solution
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='delete'>X</a></td>
        `;
        list.appendChild(row);
    }

    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Add Event Listener
form.addEventListener('submit', newBook);


//Define functions

function newBook(e) {
    let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

    let book = new Book(title, author, isbn);

    let ui = new UI();


    ui.addToBookList(book);

    ui.clearFields();
        
    e.preventDefault();
}