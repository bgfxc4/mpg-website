import express from 'express';
import { MongoClient } from "mongodb"
const app = express();
const PORT = 5558;

var db;

app.get('/api/get/:category/:article', (req,res) => {
	console.log("got api request article: " + req.params.category + " article: " + req.params.article);
	res.send("placeholder for article");
});

app.get('/api/get/:category/', (req,res) => {
	console.log("got api request category: " + req.params.category);
	res.send("placeholder for all articles");
});

app.get('/api/get/', (req,res) => {
	console.log("got api all categorys");
	res.send("placeholder for all categorys");
});

app.use("/", express.static("../Website"))

app.listen(PORT, () => {
	console.log(`[server]: Server is running at https://localhost:${PORT}`);
	MongoClient.connect("mongodb://localhost:27017/mpg-website", { useUnifiedTopology: true }, (err, mdb) => {
		if (err) throw err;
		db = mdb;
	})
});
