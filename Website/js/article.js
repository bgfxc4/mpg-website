import {config} from "./config"

function get_article(category, name) {
    data = undefined;
    fetch(config.url + `/api/${category}/${name}`).then(data=>{return data.json()}).then(res=>{console.log(res); data = res})
    return data
}

function get_articles(category) {
    data = undefined;
    fetch(config.url + `/api/${category}`).then(data=>{return data.json()}).then(res=>{console.log(res); data = res})
    return data
}

function get_categories() {
    data = undefined;
    fetch(config.url + "/api").then(data=>{return data.json()}).then(res=>{console.log(res); data = res})
    return data
}
