
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const api = require('./api');

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.get('/', function(req, res) {
    res.send('Hello from server');
})

app.listen(PORT, function(){
    console.log('Express server running on port '+ PORT)});