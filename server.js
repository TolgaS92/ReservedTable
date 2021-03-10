const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [
    {
        name: 'chris',
        phoneNumber: '7202020202',
        email: 'chris@test.com',
        id: 'chrisBecker'
    },
    {
        name: "becky",
        phoneNumber: "000000000",
        email: 'test@test.com',
        id: 'beckyback'
    }
];


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'restaurant.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reservation.html')));

app.get('/tables', (req, res) => res.json(tables));
/* app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html'))); */

app.get('/tables/:reserve', (req, res) => {
    const reserved = req.params.reserve;
    console.log(reserved);

    for (let i = 0; i < tables.length; i++) {
        if (reserved === tables[i].name) {
            return res.json(tables[i]);
        }
    }
    return res.json(false);
});

app.post('/api/tables/reserve', (req, res) => {
    const newCustomer = req.body;
    tables.push(newCustomer);
    res.json(newCustomer);
    console.log(newCustomer);
})

app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));
