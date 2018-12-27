// Book class: represent book with title, author, isbn

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class: handle UI tasks
class UI {
    static displayBooks() {
        // hard-coded for templating

        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm-delete">x</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        const btn = el.classList.value
        console.log(typeof(btn))
        if(btn.includes("delete")) {
            console.log(el.parentElement.parentElement)
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);
        setTimeout(() => 
            document.querySelector('.alert').remove(), 900
        )
        
    }

    static clearFields() {
        // get form values
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }

}
// Store Class: handles local storage
// in localStorage, we cannot store objects, need to store as strings
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'))
        } 

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: add book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    e.preventDefault();
    // get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Book data missing','danger');
    }
    else {
    // instantiate book
        const book = new Book(title, author, isbn);
        
        // add to UI list
        UI.addBookToList(book);
        Store.addBook(book);
        // clear form fields
        UI.clearFields();
        UI.showAlert('Book added','success');
    }



});

// Event: remove book
document.querySelector('#book-list').addEventListener('click', (e) => {

    // remove book from ui
    UI.deleteBook(e.target);

    // remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert('Book removed','warning');
})

