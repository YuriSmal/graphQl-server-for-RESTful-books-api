const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const BooksAPI = require('./datasources/books');
const AuthAPI = require('./datasources/authentication');

const session = {
    authToken: null
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        const authHeader = req.headers['authorization'];
        const authToken = authHeader && authHeader.split(' ')[1];
        session.authToken = authToken;
        return {session};
    },
    dataSources: () => ({
        booksAPI: new BooksAPI(),
        authAPI: new AuthAPI()
    })
});

server.listen(8000).then(() => {
    console.log('Server it running!')
})
