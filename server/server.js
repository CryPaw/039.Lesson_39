const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const { request } = require('http');

const orders = [
    {
        id: 1,
        item: "Television",
        units: 1,
        price: 2345.67
    },

    {
        id: 2,
        item: "Washing machine",
        units: 3,
        price: 23.34
    },

    {
        id: 3,
        item: "Laptop",
        units: 1,
        price: 23455.34
    }];

const port = 8000;

const app =express();

app.use(bodyParser.json());

router.get( '/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/', router);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/orders', (req, res) => {
    console.log("Orders requested");
    res.send(orders);
});

app.post('/orders', (req, res) => {
    console.log('Add order');
    const order = req.body;
    console.log(order);
    orders.push(order);
});

app.delete('/orders', (req, res) => {
    console.log('Delete order');
    orders.pop();
});

app.put('/orders', (req, res) => {
    const order = req.body;
    const index = orders.findIndex(n => n.id === 2);
    if (index !== -1) {
    orders.splice(index, 1);
    }
    console.log('Order changed');
    orders.push(order)
});

app.listen(port, () => {
    console.log(`Server listening on the port:${port}`);
});
