const { gql } = require('apollo-server');

const typeDefs = gql`
    type Book {
        title: String!
        author: String!
        id: ID!
        pages: Int!
    }
    
    type BookOfUser {
        title: String!
        author: String!
        id: ID!
        pages: Int!
        addedByUserId: ID!,
        currentPage: Int,
        isReadingCompleted: Boolean
    }
    
    type User {
        name: String!
        password: String!
    }
    
    type Session {
        accessToken: String
        refreshToken: String
    }
    
    type Query {
        books: [Book]!
        getBooksLibrary(user_id: Int): [BookOfUser]
    }
   
   type Mutation {
        login(name: String!, password: String!): Session
        logOut(token: String!): Session
        signUp(name: String!, password: String!): User
        addBook(title: String!, author: String!, pages: Int!): Book
        editBook(id: Int, title: String!) : Book
        deleteBook(id: Int): [Book]
        addBookToLibrary(user_id: Int, book_id: Int): [BookOfUser]
        updateReadStatus(user_id: Int!, book_id: Int!, currentPage: Int!): BookOfUser
        deleteBookFromLibrary(user_id: Int, book_id: Int): [BookOfUser]
   }
`;

module.exports = typeDefs;