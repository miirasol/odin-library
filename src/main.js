class Library {
	static library = [];

	addBook(title, author, pages, hasBeenRead) {
		const book = new Book(title, author, pages, hasBeenRead);

		Library.library.push(book);
	}
}

class Book {
	#id;
	#title;
	#author;
	#pages;
	#hasBeenRead;

	constructor(title, author, pages, hasBeenRead) {
		this.#id = crypto.randomUUID();
		this.#title = title;
		this.#author = author;
		this.#pages = pages;
		this.#hasBeenRead = hasBeenRead;
	}

	toggleRead() {
		this.#hasBeenRead = !this.#hasBeenRead;
	}

	get title() {
		return this.#title;
	}

	set title(value) {
		this.#title = value;
	}

	get author() {
		return this.#author;
	}

	set author(value) {
		this.#author = value;
	}

	get pages() {
		return this.#pages;
	}

	set pages(value) {
		this.#pages = value;
	}

	get hasBeenRead() {
		return this.#hasBeenRead;
	}

	get id() {
		return this.#id;
	}
}

function displayBooks() {
	const container = document.querySelector("#library-container");

	container.innerHTML = "";

	Library.library.forEach((book) => {
		const bookCard = document.createElement("div");
		bookCard.classList.add("book-card");

		bookCard.dataset.id = book.id;

		bookCard.innerHTML = `<h3>Title: ${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Has Been Read: ${book.hasBeenRead ? "Yes" : "No"}</p>
    <button class="toggle-read-button" data-id="${book.id}">Toggle Read Status</button>
    <button class="delete-button" data-id="${book.id}">Delete</button>
    `;

		container.appendChild(bookCard);
	});
}

const libraryContainer = document.querySelector("#library-container");
libraryContainer.addEventListener("click", (e) => {
	if (e.target.classList.contains("delete-button")) {
		const targetId = e.target.dataset.id;

		Library.library = Library.library.filter((book) => book.id !== targetId);

		displayBooks();
	}

	if (e.target.classList.contains("toggle-read-button")) {
		const targetId = e.target.dataset.id;

		const targetBook = Library.library.find((book) => book.id === targetId);

		targetBook.toggleRead();

		displayBooks();
	}
});

const form = document.querySelector("#new-book-form");
const library = new Library();
form.addEventListener("submit", (e) => {
	e.preventDefault();

	const titleValue = document.querySelector("#title").value;
	const authorValue = document.querySelector("#author").value;
	const pagesValue = document.querySelector("#pages").value;
	const isRead = document.querySelector("#has-been-read").checked;

	library.addBook(titleValue, authorValue, pagesValue, isRead);

	displayBooks();
	form.reset();
});
