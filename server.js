const { table } = require('console');
const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let tables = [
    {
        routeName: 'chris',
        name: 'Chris',
        phoneNumber: '7202020202',
        email: 'chris@test.com',
        id: 'chrisBecker'
    },
    {
        routeName: 'becky',
        name: "Becky",
        phoneNumber: "000000000",
        email: 'test@test.com',
        id: 'beckyback'
    }
];
let newCustomer = [];
let waitingCustomer = [];
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'restaurant.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reservation.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

app.get('/api/tables', (req, res) => res.json(tables));
/* app.get('/api/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html'))); */
app.get('/api/waitlist', (req, res) => res.json(waitingCustomer));

app.get('/api/tables/:reserve', (req, res) => {
    const reserved = req.params.reserve;
    console.log(reserved);

    for (let i = 0; i < tables.length; i++) {
        if (reserved === tables[i].name) {
            return res.json(tables[i]);
        }
    }
    return res.json(false);
});

app.post('/api/tables', (req, res) => {
    if (tables.length < 5) {
        tables.push(req.body)
        res.json(tables);
    } else {
        waitingCustomer.push(req.body)
        res.json(newCustomer);
    }
})

app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));
