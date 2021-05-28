const URL_MONGO =
	'mongodb+srv://vicdoblepe:vicdoblepe2@cards-game.skn15.mongodb.net/Cards-game?retryWrites=true&w=majority';

// Código para conectar por compass : mongodb+srv://vicdoblepe:vicdoblepe2@cards-game.skn15.mongodb.net/Cards-game?retryWrites=true&w=majority
// Collection: Users
const express = require('express');
const mongodb = require('mongodb');
const app = express();
let MongoClient = mongodb.MongoClient;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
let db;
MongoClient.connect(URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
	err ? console.log(err) : (db = client.db('Cards-game'));
});
app.listen(process.env.PORT || 3000);

const URL_MONGO =
	'mongodb+srv://vicdoblepe:vicdoblepe2@cards-game.skn15.mongodb.net/Cards-game?retryWrites=true&w=majority';
