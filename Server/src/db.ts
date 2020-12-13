import sha512 from "js-sha512" 
import * as main from "../index"
import { Db, MongoClient } from "mongodb"

export var db: Db

export function init_db() {
	MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true }, (err, mdb) => {
		if (err) throw err
		db = mdb.db("mpg-website")
		console.log("succesfully initialized db")
	})
}

export function create_category(object: main.category, callback: (answ_code: number, answ: string) => void) {
	db.collection("categorys").findOne({id: object.id}, (err, res) => {
		if (err) throw err
		if (res != null) return callback(1, `The category with the id ${object.id} exists already!`)
		db.collection("categorys").insertOne(object, (err, res) => {
			if (err) throw err
			callback(0, `Succesfully created a category with the name ${object.name}!`)
		})
	})
}

export function create_article(object: main.article, callback: (answ_code: number, answ: string) => void) {
	db.collection("categorys").findOne({id: object.category_id}, (err, res) => {
		if (err) throw err;
		if (res == null) return callback(1, `There is no category with the id ${object.category_id}!`)
		for(var i in res.articles) {
			if (res.articles[i].id == object.id) {
				return callback(1, `The article id ${object.id} exists already in the category with the id ${object.category_id}!`)
			}
		}
		res.articles.push(object)
		db.collection("categorys").updateOne({id: object.category_id}, { $set: {articles: res.articles } }, (err, res) => {
			if (err) throw err
			return callback(0, `The article with the id ${object.id} was succesfully created in the category with the id ${object.category_id}!`)
		})
	})
}

export function get_all_categorys(callback: (answ_code: number, answ: Array<any>) => void) {
	db.collection("categorys").find({}).toArray().then(arr => {return callback(200, arr)})
}

export function get_category_by_id(id: string, callback: (answ_code: number, answ: any) => void) {
	db.collection("categorys").findOne({id: id}, (err, res) => {
		if (err) throw err
		callback(200, res)
	})
}

export function get_article_by_id(category_id: string, article_id: string, callback: (answ_code: number, answ: any) => void) {
	db.collection("categorys").findOne({id: category_id}, (err, res) => {
		if (err) throw err
		for (var i in res.articles) {
			if (res.articles[i].id == article_id) return callback(200, res.articles[i])
		}
		return callback(404, `The article with the id ${article_id} doesnt exist in the category with the id ${category_id}`)
	})
}

export function authenticate_admin(username: string, password: string, callback: (auth: boolean) => void) {
	db.collection("admin_users").findOne({username: username}, (err, res) => {
		if (err) throw err
		if (res == null) return callback(false)
		var passwd = sha512.sha512(password)
		if (res.password == passwd) {
			return callback(true);
		} else {
			return callback(false);
		}
	})	
}
