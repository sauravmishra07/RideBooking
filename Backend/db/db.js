const mongoose = require('mongoose');

function connectToDb() {
    const uri = process.env.DB_CONNECT;
    if (!uri) {
        console.error('Missing DB_CONNECT environment variable. Make sure .env is loaded and contains DB_CONNECT.');
        process.exit(1);
    }

    mongoose.connect(uri).then(() => {
        console.log('Connected to DB');
    }).catch(err => {
        console.error('Failed to connect to MongoDB. Error message:', err.message);
        // For Atlas auth errors you will see 'authentication failed' here.
        console.error(err);
        process.exit(1);
    });
}

module.exports = connectToDb;