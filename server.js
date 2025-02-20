const express = require('express')
const mysql = require('mysql');
const app = express();

//ใข้ middle ware เพื่อเปลี่ยน json ให้เป็น object
app.use(express.json());

// MySQL Connection และตั้งค่า Port ที่ mamp ให้ตรง
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql_nodejs',
    port: '8889'
})

//เช็คว่า เราเชื่อมต่อกับ MYSQL ได้ไหม
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database = ', err)
        return;
    }
    console.log('MySQL successfully connected!');
})

//การสร้าง Create Route ใน Node.js โดยเชื่อมต่อกับ MySQL ผ่าน Express.js
app.post("/create", async (req, res) => {
    const { name, email, password } = req.body; 
    try {
        connection.query(
            "INSERT INTO users(fullname, email, password) VALUES(?, ?, ?)",
            [ name, email, password ],

            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New user successfully created!"});
            }
        )
        
        
    } catch (error) {
        console.log(err);
        return res.status(500).send();
    }
})

//REED การดึงข้อมูล

app.get("/read", async (req, res) => {
    try {
        connection.query("SELECT * FROM users", (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})


app.listen(3000, () => console.log('Server is running on port 3000'));