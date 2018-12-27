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
        const StoredBooks = [
            {
                title: 'Book one',
                author: 'John Doe',
                isbn: '34343434'
            },
            {
                title: 'Book two',
                author: 'Jane Doe',
                isbn: '23232323'
            },
        ];

        const books = StoredBooks;

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
}
// Store Class: handles local storage

// Event: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: add book

// Event: remove book