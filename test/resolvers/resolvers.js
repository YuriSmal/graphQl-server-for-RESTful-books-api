const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const resolvers = require('../../resolvers');
const AuthAPI = require('../../datasources/authentication');
const BooksAPI = require('../../datasources/books');

describe('#login mutation', () => {
    it('should return access and refresh tokens', async () => {
       const authApi = new AuthAPI();
       const user = {name: 'Yurii', password: '1234567890'};
       sinon.stub(authApi, 'loginUser').returns(Promise.resolve({
           data: {
               login: {
                   accessToken: 'test',
                   refreshToken: 'test'
               }
           }
       }))
        
       const result = await resolvers.Mutation.login(null,
           {
               name: user.name,
               password: user.password
           },
           {
               dataSources: {
                   authAPI: authApi
               }
           });

       await expect(result).to.deep.equal({
           data: {
               login: {
                   accessToken: 'test',
                   refreshToken: 'test'
               }
           }
       })
    });
});

describe('#signUp mutation', () => {
    it('should create new user', async () => {
        const authApi = new AuthAPI();
        const user = {name: 'Yurii', password: '1234567890'};
        sinon.stub(authApi, 'signUp').returns(Promise.resolve({
            data: {
                signUp: {
                    name: 'Yurii',
                    password: '1234567890'
                }
            }
        }));

        const result = await resolvers.Mutation.signUp(null,
            {
                name: user.name,
                password: user.password
            },
            {
                dataSources: {
                    authAPI: authApi
                }
            });

        await expect(result).to.deep.equal({
            data: {
                signUp: {
                    name: 'Yurii',
                    password: '1234567890'
                }
            }
        });
    });
});

describe('addBook mutation', () => {
    it('should return the created book info', async () => {
        const booksApi = new BooksAPI();
        const book = {title: 'book', author: 'author', pages: 100};

        sinon.stub(booksApi, 'postBook').returns(Promise.resolve({
            data: {
                addBook: {
                    title: book.title,
                    author: book.author,
                    pages: book.pages
                }
            }
        }));

        const result = await resolvers.Mutation.addBook(null,
            {
                title: book.title,
                author: book.author,
                pages: book.pages
            },
            {
                dataSources: {
                    booksAPI: booksApi
                }
            });

        await expect(result).to.deep.equal({
            data: {
                addBook: {
                    title: book.title,
                    author: book.author,
                    pages: book.pages
                }
            }
        })
    });
});

describe('#editBook mutation', () => {
    it('should return edited book info', async () => {
        const booksAPI = new BooksAPI();
        const title = {title: 'newBook'};
        const id = {id: 2};

        sinon.stub(booksAPI, 'editBook').returns(Promise.resolve({
            data: {
                editBook: {
                    title: title.title,
                    id: id.id
                }
            }
        }));

        const result = await resolvers.Mutation.editBook(null,
            {
                title: title.title,
                id: id.id
            },
            {
                dataSources: {
                    booksAPI: booksAPI
                }
            });

        await expect(result).to.deep.equal({
            data: {
                editBook: {
                    title: title.title,
                    id: id.id
                }
            }
        })
    });
});

describe('#deleteBook mutation', () => {
    it('should return arr of remaining books', async () => {
        const booksAPI = new BooksAPI();

        sinon.stub(booksAPI, 'deleteBook').returns(Promise.resolve({
            data: {
                deleteBook: [{
                    id: 2
                }]
            }
        }));

        const result = await resolvers.Mutation.deleteBook(null,
            {
                id: 1
            },
            {
                dataSources: {
                    booksAPI: booksAPI
                }
            });

        await expect(result).to.deep.equal({
            data: {
                deleteBook: [{
                    id: 2
                }]
            }
        })
    });
});

describe('#addBookToLibrary mutation', () => {
    it('should return added book', async () => {
        const booksAPI = new BooksAPI();
        const user_id = {user_id: 2};
        const book_id = {book_id: 5};

        sinon.stub(booksAPI, 'addBookToLibrary').returns(Promise.resolve({
            data: {
                addBookToLibrary: {
                    title: 'book5',
                }
            }
        }));

        const result = await resolvers.Mutation.addBookToLibrary(null,
            {
                user_id: user_id.user_id,
                books_id: book_id.book_id
            },
            {
                dataSources: {
                    booksAPI: booksAPI
                }
            });

        await expect(result).to.deep.equal({
            data: {
                addBookToLibrary: {
                    title: 'book5',
                }
            }
        })
    });
});

describe('#updateReadStatus mutation', () => {
    it('should return updated book', async () => {
        const booksAPI = new BooksAPI();
        const user_id = {user_id: 2};
        const book_id = {book_id: 5};
        const currentPage = {currentPage: 500}

        sinon.stub(booksAPI, 'updateReadStatus').returns(Promise.resolve({
            data: {
                updateReadStatus: {
                    currentPage: currentPage.currentPage
                }
            }
        }));

        const result = await resolvers.Mutation.updateReadStatus(null,
            {
                user_id: user_id.user_id,
                books_id: book_id.book_id,
                currentPage: currentPage.currentPage
            },
            {
                dataSources: {
                    booksAPI: booksAPI
                }
            });

        await expect(result).to.deep.equal({
            data: {
                updateReadStatus: {
                    currentPage: currentPage.currentPage
                }
            }
        })
    });
});

describe('#deleteBookFromLibrary mutation', () => {
    it('should return arr of remaining books', async () => {
        const booksAPI = new BooksAPI();
        const user_id = {user_id: 2};
        const book_id = {book_id: 5};

        sinon.stub(booksAPI, 'deleteBookFromLibrary').returns(Promise.resolve({
            data: {
                deleteBookFromLibrary: [{
                    id: 2
                }]
            }
        }));

        const result = await resolvers.Mutation.deleteBookFromLibrary(null,
            {
                user_id: user_id.user_id,
                books_id: book_id.book_id,
            },
            {
                dataSources: {
                    booksAPI: booksAPI
                }
            });

        await expect(result).to.deep.equal({
            data: {
                deleteBookFromLibrary: [{
                    id: 2
                }]
            }
        })
    });
});

describe('#books query', () => {
    it('should return all books', async () => {
        const booksAPI = new BooksAPI();

        sinon.stub(booksAPI, 'getAllBooks').returns(Promise.resolve({
            data: {
                books: [{
                    title: 'test',
                    author: 'test'
                }]
            }
        }));

        const result = await resolvers.Query.books(null, null,
            {
                dataSources: {
                    booksAPI: booksAPI
                }
            });

        await expect(result).to.deep.equal({
            data: {
                books: [{
                    title: 'test',
                    author: 'test'
                }]
            }
        })
    });
})

describe('#getBooksLibrary query', () => {
    it('should return books of particular user', async () => {
        const booksAPI = new BooksAPI();
        const user_id = {user_id: 2};

        sinon.stub(booksAPI, 'getBookLibrary').returns(Promise.resolve({
            data: {
                getBooksLibrary: {
                    title: 'test',
                    addedByUserId: 2
                }
            }
        }));

        const result = await resolvers.Query.getBooksLibrary(null,
            {
                user_id: user_id.user_id
            },
            {
                dataSources: {
                    booksAPI: booksAPI
                }
            });

        await expect(result).to.deep.equal({
            data: {
                getBooksLibrary: {
                    title: 'test',
                    addedByUserId: 2
                }
            }
        })
    });
});

describe('#logOut mutation', () => {
    it('should delete refresh and access tokens ', async () => {
        const authApi = new AuthAPI();
        const refreshToken = {token: 'test'};

        sinon.stub(authApi, 'logOut').returns(Promise.resolve({
            data: {
                logOut: {
                    accessToken: null,
                    refreshToken: null
                }
            }
        }));

        const result = await resolvers.Mutation.logOut(null,
            {
                refreshToken: refreshToken.token
            },
            {
                dataSources: {
                    authAPI: authApi
                },
                session: {
                    accessToken: 'test'
                }
            });

        await expect(result).to.deep.equal({
            data: {
                logOut: {
                    accessToken: null,
                    refreshToken: null
                }
            }
        })
    });
})