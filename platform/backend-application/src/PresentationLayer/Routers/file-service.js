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

            var newPath = path.join(__dirname, 'uploads') + '/' + files.profilePic.originalFilename;
            console.log(oldPath, newPath)

            var rawData = fs.readFileSync(oldPath);

            fs.writeFile(newPath, rawData, function(err) {
                if (err) console.log(err)
                return res.send("Successfully uploaded")
            })
        })
    });

    router.get('/uploadF', (req, res) => {
        res.send(`
          <h2>With <code>"express"</code> npm package</h2>
          <form action="/api/uploadF" enctype="multipart/form-data" method="post">
            <div>Text field title: <input type="text" name="title" /></div>
            <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
            <input type="submit" value="Upload" />
          </form>
        `);
    });
    router.post('/uploadF', (req, res, next) => {

        const form = formidable({ multiples: true, uploadDir: __dirname });

        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ fields, files });
        });


        // const form = new formidable.IncomingForm();
        // form.parse(req, function(err, fields, files) {

        //     var oldPath = files.profilePic.filepath;

        //     var newPath = path.join(__dirname, 'uploads') + '/' + files.profilePic.originalFilename;
        //     console.log(oldPath, newPath)

        //     var rawData = fs.readFileSync(oldPath);

        //     fs.writeFile(newPath, rawData, function(err) {
        //         if (err) console.log(err)
        //         return res.send("Successfully uploaded")
        //     })
        // })
    });


    router.get('/download', function(req, res) {
        const file = `${__dirname}/uploads/random.jpg`;
        res.download(file); // Set disposition and send it.
    });



    return router
}