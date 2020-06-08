module.exports = {
    //token hashing secret string
    token: {
        secret: 'sdasjndjnlkadnel'
    },
    // MongoDB connection options
    mongo: {
        useMongoClient: true,
        uri: 'mongodb://localhost/pizza'
    },
    // Seed database on startup
    seedDB: true
};