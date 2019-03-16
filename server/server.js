const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('build'));

// Axios GET
app.get('/newJokes', (req, res) => {
    let requestUrl = 'https://icanhazdadjoke.com/search';
    axios({
        method: 'GET',
        url: requestUrl,
        headers: {
            'User-Agent': 'Dad Joke Generator (https://www.github.com/lysautumn/dad-joke-generator)',
            'Accept': 'application/json',
        },
        params: {
            limit: 30
        }
    })
    .then(response => {
        res.send(response.data.results);
    }).catch(error => {
        console.log('Error in GET:', error);
        res.sendStatus(500);
    })
})

// Start server
app.listen(PORT, () => {
    console.log('Listening on PORT:', PORT);
})