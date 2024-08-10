const express = require('express');
const app = express()

const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')

const connection = mysql.createConnection(config)

const dropTable = `DROP TABLE IF EXISTS people;`
const createTable =
    `CREATE TABLE 
        people (
            id int NOT NULL AUTO_INCREMENT, 
            name varchar(255), 
            PRIMARY KEY (id)
        );`

connection.query(dropTable)
connection.query(createTable)

connection.end()

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config)

    const insertPeople =
        `INSERT INTO 
            people (name) 
         VALUES
            ('Wesley'),
            ('Leonardo'),
            ('Gustavo'),
            ('Guilherme'),
            ('Luis');`

    connection.query(insertPeople)

    const query =
        `SELECT
            name
        FROM
            people;`

    html = `<h1>Full Cycle Rocks!</h1>`
    br = `</br>`

    connection.query(query, function (err, result) {
        if (err) throw err
        const names = result.map((row) => row.name)
        connection.end()
        res.send(`${html}${br}${names.join(', ')}`)
    })
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})
