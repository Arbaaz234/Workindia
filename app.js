import connection from "./connect/connection.js"
import express from 'express';
import booksroute from './routes/booksroute.js'
import authroutes from './routes/authroute.js'
const app = express();

app.use('/api', authroutes);
app.use('/api/books', booksroute);

app.get("/", (req, res) => {
    connection.query('SELECT * from users LIMIT 1', (err, rows) => {
        if (err) throw err;
        console.log('The data from users table are: \n', rows);
        connection.end();
    });
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});