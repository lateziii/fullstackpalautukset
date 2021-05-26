/*Tehdään joukko blogilistan käsittelyyn tarkoitettuja apufunktioita. Tee funktiot esim. tiedostoon utils/list_helper.js. Tee testit sopivasti nimettyyn tiedostoon hakemistoon tests.

4.3: apufunktioita ja yksikkötestejä, step1
Määrittele ensin funktio dummy
*/
var lodash = require('lodash');
const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((totalLikes, value) => {
        return totalLikes + value.likes
    }, 0)
}
const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((max, value) => {
        return value.likes > max ? value : max 
    });
    return favorite
}
const mostBlogs = (blogs) => {
    const mostPosts = lodash.chain(blogs)
    .groupBy('author').map((value, key) => ({ author: key, blogs: value.length }))
    .reduce((max, value) => {
        return value.blogs > max.blogs ? value : max 
    })
    .value()
    return mostPosts
}
const mostLikes = (blogs) => {
    const result = lodash.chain(blogs)
    .groupBy('author').map((value, key) => ({ author: key, likes: totalLikes(value) }))
    .reduce((max, value) => {
        return value.likes > max.likes ? value : max 
    })
    .value()
    return result
}

  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
