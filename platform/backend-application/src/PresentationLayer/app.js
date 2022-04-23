const express = require("express")
const app = express()





module.exports = function({ restAPI, fileService }) {


    const app = express()

    app.use('/api/', restAPI)
    app.use('/api/', fileService)

    return app
}