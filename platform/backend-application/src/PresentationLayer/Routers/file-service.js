const express = require('express');
const fs = require('fs');
const path = require('path')
const formidable = require('formidable');


module.exports = function() {
    const router = express.Router()



    //This is a test function

    router.post('/upload', (req, res, next) => {

        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {

            var oldPath = files.profilePic.filepath;
            var somevalue = Math.random().toString()
            console.log(fields.sessionID, fields.collision, fields.collisions_at, '<<<<<<< ')

            var newPath = path.join(__dirname, 'uploads') + '/' + somevalue + files.profilePic.originalFilename;
            console.log(oldPath, newPath)

            var rawData = fs.readFileSync(oldPath);

            fs.writeFile(newPath, rawData, function(err) {
                if (err) console.log(err)
                return res.send( { fields, files })
            })
        })
    });



    router.get('/download', function(req, res) {

        const file = `${__dirname}/uploads/IMG_5664.jpg`;
        res.download(file); // Set disposition and send it.
    });



    return router
}