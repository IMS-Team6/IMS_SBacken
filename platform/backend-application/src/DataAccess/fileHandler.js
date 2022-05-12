const fs = require('fs');

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

    return exports;

}