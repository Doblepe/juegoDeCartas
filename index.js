
/*const URL_MONGO =
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
*/
const express = require('express');
const mongodb = require('mongodb');
const app = express();
let MongoClient = mongodb.MongoClient;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

let db;

MongoClient.connect("mongodb+srv://vicdoblepe:vicdoblepe2@cards-game.skn15.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
	err ? console.log(err) : (db = client.db("Cards-game"));
});

app.get("/scores", function(req,res){
	db.collection("Users").find().toArray(function(error, data){
		error
		? res.send({error: true, contenido: error})
		: res.send({error: false, contenido: data})
	  })
})

app.get("/bestscores", function(req,res){
    db.collection("Users").find().sort({score:-1}).limit(10).toArray(function(err,data){
        err
		? res.send({error: true, contenido: error})
		: res.send({error: false, contenido: data})
    })
})

app.post("/player", function(req,res){
    db.collection("Users").insertOne({player: req.body.player, score: 0}, function(err, data){
        err
		? res.send({error: true, contenido: error})
		: res.send({error: false, contenido: data})
    })
})



app.put("/edit", function(req, res){
    db.collection("Users").updateOne({player: req.body.player},{$set:{score: req.body.score}}, function(err, data){
        err
		? res.send({error: true, contenido: error})
		: res.send({error: false, contenido: data})  
    })
})
app.listen(process.env.PORT || 3000);   
