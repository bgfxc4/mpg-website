# mpg-website
A Server and Website for my school bc the old one is shitty 


# Documentation

## Saving of articles

the articles are getting saved in an mongo database. 
The structure is as following:


collection = category
document = article
```JS
{
	title: "",
	is_extendable: true/false,
	preview_text: "" //only if is_extendable is true, else undefined
	main_text: "",
	publication_date: "tt mm jjjj",
	category: ""
}
```

you can request an article with an GET request on `https://domain.com/api/category/name`, all articles of a category with `https://domain.com/api/category` and all categorys with `https://domain/api/`.
