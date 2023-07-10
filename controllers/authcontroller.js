import connection from "../connect/connection.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const signUp = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, email, password } = req.body;
        if (!name) res.send({ error: `Name is required` });
        if (!email) res.send({ error: `Name is required` });
        if (!password) res.send({ error: `Name is required` });
        connection.query(`select * from users where email=${email}`, (err, rows) => {
            if (err) res.send({ err })
            if (rows.length > 0) res.send({ msg: "User already exists" })
        });
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        connection.query(`insert into users(name,email,password) values(${name},${email},${hashedPassword})`, (err, rows) => {
            if (err) res.send({ err });

            // res.send({msg:"Success"})
        })

        connection.query(`select id from users where email=${email}`, (err, rows) => {
            if (err) res.send({ err });
            res.status(200).send({
                status_code: 200,
                status: "Account successfully created",
                user_id: rows
            })
        })
        // connection.query(`SELECT * from isIssued  where book_id=${bookid} and returnDate>date(current_timestamp()) LIMIT 10`, (err, rows) => {
        //     if (err) throw err;
        //     console.log(rows.length)
        //     console.log('is Availabe: \n', rows, (rows === 1 ? 'False' : "True"));
        //     res.json({
        //         msg: (rows.length === 1 ? 'False' : "True")
        //     });
        // });
    } catch (err) {
        console.error(err);
        res.json({ success: false, err })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    connection.query(`select * from users where name = ${username}`, (err, rows) => {
        if (err) { res.send({ err }); }
        if (rows.length == 0) res.send({
            status: "Incorrect username/password provided. Please retry",
            status_code: 401
        })
        if (rows.length > 0) {
            const bool = bcrypt.compare(password, rows.json().password)
            const token = jwt.sign({ id: rows.json().id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            if (bool) res.send({
                status: "Login successful",
                status_code: 200,
                user_id: rows.json().id,
                access_token: token
            })

        }
    })

    connection.query(``)
}
export default signUp;