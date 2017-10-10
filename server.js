const express = require('express');
const compression = require('compression')
const app = express();
const PORT = process.env.PORT || 3000;
const api = require('./api.js');
app.use('*', (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url)
    } else {
        return next();
    }
})
app.use(compression());
app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.get('/api/search/*', (req, res) => {
    searchReq = req.query
    api.friendsGet(searchReq).then((data) => {
        if (data >= 70000) {
            res.send({'Followers': 'tooLarge'})
        } else {
            api.listGet(searchReq).then((data) => {
                if (data == 429) {
                    res.send({"Status": 429})
                } else {
                res.send(data);
                }
            })
        }
    })
    
})
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});