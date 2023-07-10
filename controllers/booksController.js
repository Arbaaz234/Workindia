import connection from "../connect/connection.js";



const getAllBooks = async (req, res) => {
    try {
        connection.query('SELECT * from books LIMIT 10', (err, rows) => {
            if (err) throw err;
            console.log('The data from books table are: \n', rows);
            res.json({ rows });
        });
    } catch (err) {
        console.error(err);
        res.json({ success: false, msg: err })
    }
}

export const checkAvailability = (req, res) => {
    try {

        const bookid = req.params.id;
        connection.query(`SELECT * from isIssued i left join books b on b.id=i.book_id where b.name=${bookid} and returnDate>date(current_timestamp()) LIMIT 10`, (err, rows) => {
            if (err) throw err;
            console.log(rows.length)
            console.log('is Availabe: \n', rows, (rows === 1 ? 'False' : "True"));
            res.json({
                msg: (rows.length === 1 ? 'False' : "True")
            });
        });
    } catch (err) {
        console.error(err);
        res.json({ success: false, msg: err })
    }
}

export default getAllBooks