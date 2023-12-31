// Get the UI elements
let form = document.querySelector('#book-form');
let bookList = document.querySelector('#book-list'); 

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
    static addToBookList(book) {
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

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => {
            //div.remove();
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static deleteFromBook(target) {
        target.parentElement.parentElement.remove();
    }
}

// Add Event Listener
form.addEventListener('submit', newBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', getBooksFromLocalStorage);

//Define functions

function newBook(e) {
    let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === '') {
        UI.showAlert("Please fill all the fields!", "error");
    }
    else {
        let book = new Book(title, author, isbn);

        UI.addToBookList(book);
        
        UI.clearFields();

        UI.showAlert("Book Added!", "success");

        storeBookInLocalStorage(book);
    }
    
    
        
    e.preventDefault();
}

function removeBook(e) {

    if (e.target.hasAttribute('href')) {
        UI.deleteFromBook(e.target);
        UI.showAlert("Book Removed!", "success");
        removeBookFromLocalStorage(e.target);
    }
    e.preventDefault();
}

function storeBookInLocalStorage(book) {
    let books;
    // let bookObj = { 
    //     title: `${book.title}`,
    //     author: `${book.author}`,
    //     isbn: `${book.isbn}`
    // }
    if(localStorage.getItem('books') === null) {
        books = [];
        //console.log('empty');
    }
    else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
}

function getBooksFromLocalStorage() {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
        //console.log('empty');
    }
    else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(book => {
        UI.addToBookList(book);
    });
}

function removeBookFromLocalStorage(anchorTag) {
    let titleToDelete = anchorTag.parentElement.parentElement.children[2].textContent;

    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
        //console.log('empty');
    }
    else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach((book, index) => {
        if (book.isbn == titleToDelete) {
            books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
}