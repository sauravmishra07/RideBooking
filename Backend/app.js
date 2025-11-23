const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");

connectToDb();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello world');
});
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/captains', captainRoutes);

// module.exports = router;
module.exports = app;