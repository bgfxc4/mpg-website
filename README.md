# mpg-website
A Server and Website for my school bc the old one is shitty 


# Documentation

## Installation

first, you have to clone this git repo with `git clone https://github.com/bgfxc4/mpg-website`, 

then navigate into the repo with `cd mpg-website/Server` and install all needed packages with `npm i && npm typescript`.

Now you can run the server with `npm run start`.

## Saving of articles

the articles are getting saved in an mongo database. 
The structure is as following:


collection = category
document = article
```JS
{
	title: "",
	is_extendable: true/false,
	preview_text: "", //only if is_extendable is true, else undefined
	main_text: "",
	publication_date: "tt:mm:jjjj",
	category: ""
}
```

you can request an article with an GET request on `https://domain.com/api/get/[category id]/[article id]`, all articles of a category with `https://domain.com/api/get/[category id]` and all categorys with `https://domain/api/get/`.


If you want to add a new article, you have to send a post request to `https://domain.com/api/new/article` with a json body that should look like this: 
```JS
{
	username: "",
	password: "", //login credentials of the current admin
	name: "", //name of the article
	id: "", //unique id of the article
	is_extendable: true/false, 
	preview_text: "", //only if is_extendable is true, else undefined
	main_text: "", //content of the article
	publication_date: "tt:mm:jjjj",
	category: "" //the category the new article belongs to
}
```

If you want to add a new category, you have to send a post request to `https://domain.com/api/new/category` with a json body that should look like this: 
```JS
{
	username: "",
	password: "", //login credentials of the current admin
	id: "", //unique id of the category
	name: "", //name of the category
	publication_date: "tt:mm:jjjj",
}
```

**IMPORTANT: use the "Content-Type: application/json" header for the post requests**


