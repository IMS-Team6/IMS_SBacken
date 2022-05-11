const fs = require('fs');
const PImage = require('pureimage');
const FontManager = require('node-system-fonts');
const { log } = require('console');


module.exports = function() {
    const exports = {};

    exports.writeFileToServer = function(newPath, oldPath, callback) {

        var rawData = fs.readFileSync(oldPath);

        fs.writeFile(newPath, rawData, function(err) {
            if (err) {
                callback(err, [])
                return
            }
            callback([], 'sucess')
            return
        })

    }

    exports.highlightImageObjects = async function(inputFile, faces) {
        // Open the original image
        const avaliableFonts = FontManager.getAvailableFontsSync()

        const stream = fs.createReadStream(inputFile);
        console.log(stream)
        let promise;
        if (inputFile.match(/\.jpg$/)) {
            promise = PImage.decodeJPEGFromStream(stream);

        } else if (inputFile.match(/\.png$/)) {
            promise = PImage.decodePNGFromStream(stream);
        } else {
            throw new Error(`Unknown filename extension ${inputFile}`);
        }

        const img = await promise;
        const fontLoad = PImage.registerFont(avaliableFonts[0].path, 'myFont', avaliableFonts[0].weight, avaliableFonts[0].style)
        fontLoad.loadSync();

        const context = img.getContext('2d');
        context.drawImage(img, 0, 0, img.width, img.height, 0, 0);

        // Now draw boxes around all the faces
        context.strokeStyle = 'rgba(0,255,0,0.8)';
        context.lineWidth = '5';


        faces.forEach(face => {
            context.beginPath();
            let origX = 0;
            let origY = 0;
            face.boundingPoly.normalizedVertices.forEach((bounds, i) => {
                if (i === 0) {
                    origX = bounds.x * img.width;
                    origY = bounds.y * img.height;
                    context.moveTo(origX, origY);
                } else {
                    context.lineTo(bounds.x * img.width, bounds.y * img.height);
                }
            });
            context.lineTo(origX, origY);
            context.stroke();

            const fontSize = Math.round(img.height / 16);
            context.fillStyle = 'rgba(255,0,0,0.8)';
            context.font = "" + fontSize + "px myFont";

            context.fillText(face.name, origX, origY + fontSize)
        });

        // Write the result to a file
        const writeStream = fs.createWriteStream(inputFile);

        if (inputFile.match(/\.jpg$/)) {
            await PImage.encodeJPEGToStream(img, writeStream);
        } else if (inputFile.match(/\.png$/)) {
            await PImage.encodePNGToStream(img, writeStream);
        } else {
            throw new Error(`Unknown filename extension ${inputFile}`);
        }

    }

    return exports;

}