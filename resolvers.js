const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        books: async (_, { pageSize = 3, after, author }, { dataSources }) => {
            const book_author = {author: author};
            const allBooks = await dataSources.booksAPI.getAllBooks(book_author);

            const books = paginateResults({
              after,
              pageSize,
              results: allBooks
          });
            let filter = null;
            if (author) filter = {author: author}
          return {
              books,
              filter,
              cursor: books.length ? books[books.length - 1].cursor : null,
              hasMore: books.length
                ? books[books.length - 1].cursor !== allBooks[allBooks.length -1].cursor
                : false
          }
        },

        filteredBooksByAuthor (_, args, context) {
            const book_author = {author: args.author};
            const searchAuthor = context.dataSources.booksAPI.searchAuthor(book_author);
            return searchAuthor;
        },

        getBooksLibrary (_, args, context) {
            const user_id = {user_id: args.user_id};
            const getBooksLibrary = context.dataSources.booksAPI.getBookLibrary(user_id);
            return getBooksLibrary;
        }
    },
    Mutation: {
        async login (_, args, context) {
            const user = {name: args.name, password: args.password};
            const  session = await  context.dataSources.authAPI.loginUser(user);
            return session;
        },

        async logOut (_, args, context) {
            const refreshToken = {token: args.token};
            const logOut = await context.dataSources.authAPI.logOut(refreshToken);
            context.session.authToken = null;
            return logOut;
        },

        async signUp (_, args, context) {
            const user = {name: args.name, password: args.password};
            const signUser = await context.dataSources.authAPI.signUp(user);
            return signUser;
        },

        async addBook (_, args, context) {
            const book = {title: args.title, author: args.author, pages: args.pages};
            const addBook = await context.dataSources.booksAPI.postBook(book);
            return addBook;
        },

        async editBook (_, args, context) {
            const title = {title: args.title};
            const id = {id: args.id};
            const editBook = await context.dataSources.booksAPI.editBook(title, id);
            return editBook;
        },

        async deleteBook (_, args, context) {
            const id = {id: args.id};
            const deleteBook = await context.dataSources.booksAPI.deleteBook(id);
            return deleteBook;
        },

        async addBookToLibrary (_, args, context) {
            const user_id = {user_id: args.user_id};
            const book_id = {book_id: args.book_id};
            const addBookToLibrary = await context.dataSources.booksAPI.addBookToLibrary(user_id, book_id);
            return addBookToLibrary;
        },

        async updateReadStatus (_, args, context) {
            const user_id = {user_id: args.user_id};
            const book_id = {book_id: args.book_id};
            const currentPage = {currentPage: args.currentPage};
            const updateReadStatus = await context.dataSources.booksAPI.updateReadStatus(user_id, book_id, currentPage);
            return updateReadStatus;
        },

        async deleteBookFromLibrary (_, args, context) {
            const user_id = {user_id: args.user_id};
            const book_id = {book_id: args.book_id};
            const deleteBookFromLibrary = await context.dataSources.booksAPI.deleteBookFromLibrary(user_id, book_id);
            return deleteBookFromLibrary;
        }
    }
}