const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});
app.listen(5000); // start Node + Express server on port 5000

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://samwwise06:1AjdVHl@cop4331cards.6tpx1.mongodb.net/Cop4331?retryWrites=true&w=majority&appName=cop4331Cards';
const client = new MongoClient(url);
client.connect();


app.post('/api/login', async (req, res, next) => {
    // incoming: login, password
    // outgoing: id, fullname, error
    var error = '';
    const { login, password } = req.body;
    const db = client.db();
    console.log(await db.stats())
    const results = await
        db.collection('Users').find({ Login: login, Password: password }).toArray();
    var id = -1;
    var fn = '';
    if (results.length > 0) {
        id = results[0]._id;
        fn = results[0].fullName;
    }
    var ret = { id: id, fullName: fn, error: '' };
    res.status(200).json(ret);
});

app.post('/api/signup', async (req, res, next) => {
    // incoming: fullname login, password
    // outgoing: id, fullname, error
    var error = '';
    const { fullName, login, password } = req.body;
    const db = client.db();
    console.log(await db.stats())
    const results = await
        db.collection('Users').insertOne({FullName: fullName, Login: login, Password: password });
    if (results.length > 0) {
        error = results.error
    }
    var ret = { error: error };
    res.status(200).json(ret);
});

/*
app.post('/api/addcard', async (req, res, next) => {
    // incoming: userId, color
    // outgoing: error
    const { userId, card } = req.body;
    const newCard = { Card: card, UserId: userId };
    var error = '';
    try {
        const db = client.db();
        const result = db.collection('Cards').insertOne(newCard);
    }
    catch (e) {
        error = e.toString();
    }
    //cardList.push(card);
    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res, next) => {
    // incoming: userId, search
    // outgoing: results[], error
    var error = '';
    const { userId, search } = req.body;
    var _search = search.trim();
    const db = client.db();
    const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*' } }).toArray();
    var _ret = [];
    for (var i = 0; i < results.length; i++) {
        _ret.push(results[i].Card);
    }
    var ret = { results: _ret, error: error };
    res.status(200).json(ret);
});
*/
