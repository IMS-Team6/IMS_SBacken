const express = require("express")
const app = express()





  module.exports = function ({ restAPI }) { 

    
    const app = express()

    app.use('/api', restAPI)

    return app
}