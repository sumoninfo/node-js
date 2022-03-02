const mySql   = require('mysql')
const express = require('express')
const app     = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())


let mySqlConn = mySql.createConnection({
    host: 'localhost', user: 'root', password: '1234', database: 'node_js',
})

mySqlConn.connect((error) => {
    if (!error) {
        console.log('DB connection successful')
    } else {
        console.log(`DB connection failed!, Error: ${JSON.stringify(error, undefined, 2)}`)
    }
})

app.get('/', (req, res) => {
    console.log('aaaa');
})
//Get all employees
app.get('/employees', (req, res) => {
    mySqlConn.query("SELECT * FROM employees", (error, rows, fields) => {
        if (!error) {
            res.send(rows)
        } else {
            console.log(error)
            res.send(error)
        }
    })
})

//Get an employee
app.get('/employees/:id', (req, res) => {
    mySqlConn.query('SELECT * FROM employees WHERE id = ?', [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.send(rows)
        } else {
            console.log(error)
            res.send(error)
        }
    })
})

//Delete an employee
app.delete('/employees/:id', (req, res) => {
    mySqlConn.query('DELETE FROM employees WHERE id = ?', [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.send("Deleted Successfully")
        } else {
            console.log(error)
            res.send(error)
        }
    })
})


//Insert an employee
app.post('/employees', (req, res) => {
    const request  = req.body
    const employee = {name: request.name, code: request.code, salary: request.salary};
    mySqlConn.query('INSERT INTO employees SET ?', employee, (error, rows, fields) => {
        if (!error) {
            res.send("Inserted Successfully")
        } else {
            console.log(error)
            res.send(error)
        }
    })
})
//Update an employee
app.put('/employees/:id', (req, res) => {
    const request = req.body;
    mySqlConn.query('UPDATE employees SET name = ?, code = ?, salary = ? WHERE id = ?', [
        request.name, request.code, request.salary, req.params.id
    ], (error, results, fields) => {
        if (!error) {
            res.send("Updated Successfully")
        } else {
            console.log(error)
            res.send(error)
        }
    })
})

app.listen(3000, () => {
    console.log('server run 3000')
})
