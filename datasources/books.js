const { RESTDataSource } = require('apollo-datasource-rest');

class BooksAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:5000/';
    }

    willSendRequest(request) {
        request.headers.set('Authorization', 'Bearer ' + this.context.session.authToken)
    };

    async getAllBooks() {
        const response = await this.get('books');
        return (response)
            ? response.books.map(book => this.booksReducer(book))
            : [];
    }

    async postBook(book) {
        return await this.post(
            'books',
            book
        )
    }

    async editBook(title, id) {
        await this.put(
            `books/${id.id}`,
            title
        );
        const response = await  this.get('books');
        return response.books.find(book => book.id === id.id);
    }

    async deleteBook(id) {
       await this.delete(`books/${id.id}`);
       const response = await this.get('books');
       return (response) ? response.books.map(book => this.booksReducer(book)) : [];
    }

    async addBookToLibrary(userId, bookId) {
        await this.post(`users/${userId.user_id}/books/${bookId.book_id}`);
        const response = await this.get(`users/${userId.user_id}/books`);
        return response ? response.filteredBooks.map(book => this.userBooksReducer(book)) : [];
    }

    async getBookLibrary(userId) {
        const response = await this.get(`users/${userId.user_id}/books`);
        return response ? response.filteredBooks.map(book => this.userBooksReducer(book)) : [];
    }

    async updateReadStatus(userId, bookId, currentPage) {
        await this.put(
            `users/${userId.user_id}/books/${bookId.book_id}`,
            currentPage);
        const response = await this.get(`users/${userId.user_id}/books`);
        return response ? response.filteredBooks.find(book => book.id === bookId.book_id) : [];
    }

    async deleteBookFromLibrary(userId, bookId) {
        await this.delete(`users/${userId.user_id}/books/${bookId.book_id}`);
        const response = await this.get(`users/${userId.user_id}/books`);
        return response ? response.filteredBooks.map(book => this.userBooksReducer(book)) : [];
    }

    booksReducer(book) {
        return {
            title: book.title,
            author: book.author,
            id: book.id,
            pages: book.pages
        }
    }

    userBooksReducer(book) {
        return {
            title: book.title,
            author: book.author,
            id: book.id,
            pages: book.pages,
            addedByUserId: book.addedByUserId,
            currentPage: book.currentPage,
            isReadingCompleted: book.isReadingCompleted
        }
    }
}

module.exports = BooksAPI;