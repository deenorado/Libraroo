// Book object
class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

// Render DOM changes
class Render {
    static addBook (book) {
        const shelf = document.querySelector('.bookShelf');
        const div = document.createElement('div');
        div.classList.add('singleBook');
        div.innerHTML = `
                <span class="singleBookClose">&times;</span>
                <br>
                <div class="bookSeparators">
                <div class="bookLabel">Title:</div>
                <div class="bookDesc" id="bookTitle">${book.title}</div>
                </div>
                <div class="bookSeparators">
                <div class="bookLabel">Author:</div>
                <div class="bookDesc">${book.author}</div>
                </div>
                <div class="bookSeparators">
                <div class="bookLabel">Pages:</div>
                <div class="bookDesc">${book.pages}</div>
                </div>
                <div class="readLabel">${book.read}</div>
            `;
        shelf.appendChild(div);
    }

    static displayBooks () {
        const sampleBooks = [
            {
                title: 'Shigenki No Kyojin',
                author: 'Hajime Isayama',
                pages: 1281,
                read: 'Not Read'
            },
            {
                title: 'Velveteen Rabbit',
                author: 'Margery Williams',
                pages: 42,
                read: 'Read'
            },
        ];

        sampleBooks.forEach((book) => {
            Render.addBook(book);
        });
    }

    static removeBook (e) {
        if (e.classList.contains('singleBookClose')) {
            e.parentElement.remove();
        }
    }

    static resetForm () {
        document.querySelector('.bookForm').reset();
    }
}

// Displays books
document.addEventListener('DOMContentLoaded', Render.displayBooks);

// Adds book
document.querySelector('.bookForm').addEventListener('submit', (e) => {
    // Prevent actual submission
    e.preventDefault();

    // Get book form popup input values
    const title = document.querySelector('#title').value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    let read = document.querySelector("#author").value;
    if (read.checked) {
        read = "Read";
    }
    else {
        read = "Not Read";
    }

    // Validate inputs
    if (title === '' || author === '' || isNaN(pages)) {
        alert('Please complete all fields!');
    }
    else {
        // Create a new book object from values and add it
        const book = new Book (title, author, pages, read);
        Render.addBook(book);

        // Clear form data after submit
        Render.resetForm();
    }
});

// Open  and close new book form
document.querySelector('.addOne').addEventListener('click', () => {
    document.querySelector('.addForm').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.addForm').style.display = 'none';
});

// Delete a single book
document.querySelector('.bookShelf').addEventListener('click', (e) => {
    Render.removeBook(e.target);
});