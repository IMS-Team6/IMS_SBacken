const express = require("express")
const app = express()

const dbURI = "mongodb+srv://Intelligenta:Demo12@cluster0.qmb43.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(dbURI,{
    useNewUrlparser:true,
    useUnifiedTopology:true
    
})


module.exports = function ({ restAPI }) { 

    const app = express()


    app.use(function (request, response, next) {
        response.setHeader("Access-Control-Allow-Origin", "*") // "localhost:3000"
        response.setHeader("Access-Control-Allow-Methods", "*") // GET, POST, PUT, DELETE
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")
        next()
    })


    app.use('/Routers/rest-api', restAPI)

    return app
}
