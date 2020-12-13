import express from 'express'
import * as db_helper from "./src/db"

const app = express()
const express_port = 5558;

app.use(express.json())

export interface article {
	username: string, 
	name: string,
	id: string,
	is_extendable: boolean,
	preview_text: string,
	main_text: string,
	publication_date: string,
	category_id: string
}

export interface category {
	username: string,
	name: string,
	id: string,
	publication_date: string,
	articles: Array<article>
}

app.get('/api/get/:category/:article', (req,res) => {
	db_helper.get_article_by_id(req.params.category, req.params.article, (code, answ) => {
		res.status(code).send(answ);
	})
})

app.get('/api/get/:category/', (req,res) => {
	db_helper.get_category_by_id(req.params.category, (code, answ) => {
		res.status(code).send(answ)
	})
})

app.get('/api/get/', (req,res) => {
	db_helper.get_all_categorys((code, answ) => {
		res.status(code).send(answ)
	})
})

app.post('/api/new/category', (req, res) => {
	if (req.body?.username == undefined) return res.status(400).send("The field 'username' must be defined!\n\r")
	if (req.body?.password == undefined) return res.status(400).send("The field 'password' must be defined!\n\r")
	if (req.body?.name == undefined) return res.status(400).send("The field 'name' must be defined!\n\r")
	if (req.body?.id == undefined) return res.status(400).send("The field 'id' must be defined!\n\r")
	if (req.body?.publication_date == undefined) return res.status(400).send("The field 'publication_date' must be defined!\n\r")

	db_helper.authenticate_admin(req.body.username, req.body.password, (auth) => {
		if (!auth) return res.status(403).send("The admin user credentials you sent are incorect!\n\r")
		var category: category = {
			username: req.body.username,
			name: req.body.name,
			id: req.body.id,
			publication_date: req.body.publication_date,
			articles: []
		}
		db_helper.create_category(category, (answ_code, answ) => {
			if (answ_code == 0) return res.status(200).send(`${answ}\n\r`)
			else if (answ_code == 1) return res.status(400).send(`${answ}\n\r`)
		})
	})
})

app.post('/api/new/article', (req, res) => {
	if (req.body?.username == undefined) return res.status(400).send("The field 'username' must be defined!\n\r")
	if (req.body?.password == undefined) return res.status(400).send("The field 'password' must be defined!\n\r")
	if (req.body?.name == undefined) return res.status(400).send("The field 'name' must be defined!\n\r")
	if (req.body?.id == undefined) return res.status(400).send("The field 'id' must be defined!\n\r")
	if (req.body?.is_extendable == undefined) return res.status(400).send("The field 'is_extendable' must be defined!\n\r")
	if (req.body?.publication_date == undefined) return res.status(400).send("The field 'publication_date' must be defined!\n\r")
	if (req.body?.category_id == undefined) return res.status(400).send("The field 'category_id' must be defined!\n\r")
	if (req.body?.main_text == undefined) return res.status(400).send("The field 'main_text' must be defined!\n\r")
	if (req.body.is_extendable && req.body.preview_text == undefined) return res.status(400).send("If the field 'is_extendable' is true, the field 'preview_text' must be defined!\n\r")

	db_helper.authenticate_admin(req.body.username, req.body.password, (auth) => {
		if (!auth) return res.status(403).send("The admin user credentials you sent are incorect!\n\r")
		var article: article = {
			username: req.body.username, 
			name: req.body.name,
			id: req.body.id,
			is_extendable: req.body.is_extendable,
			preview_text: req.body.preview_text,
			main_text: req.body.main_text,
			publication_date: req.body.publication_date,
			category_id: req.body.category_id
		}
		db_helper.create_article(article, (answ_code, answ) => {
			if (answ_code == 0) return res.status(200).send(`${answ}\n\r`)
			else if (answ_code == 1) return res.status(400).send(`${answ}\n\r`)
		})
	})
})

app.use("/", express.static("../Website"))

var server = app.listen(express_port, () => {
	console.log(`[server]: Server is running at https://localhost:${express_port}`)
	db_helper.init_db()
})

process.on("SIGINT", () => {
	server.close(() => {
		console.log("closing server")
		process.kill(process.pid, 9)
	})
})

//curl -H "Content-Type: application/json" -d '{"username": "bgfxc4", "name": "kek2", "password": "kek", "id": "kek2", "publication_date": "01.01.1970"}' https://bgfxc4.de/mpg/api/new/category	curl command to create category

//curl -H "Content-Type: application/json" -d '{"username": "bgfxc4", "name": "asdfarticle", "password": "kek", "id": "asdfarticle", "publication_date": "01.01.1970", "is_extendable": false, "category_id": "asdf", "main_text": "asdasdasdasdasdasdasd"}' https://bgfxc4.de/mpg/api/new/article curl command to create article
