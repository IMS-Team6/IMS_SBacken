module.exports = function({ globals }) {
    const exports = {}

    exports.validateFile = function(file) {
        const error = [];
        const maxFileSize = 1024 * 1024 * 20; //Add to globals folder   bildformat: jpg/jpeg/png/svg
        const allowedExtensions = /(\jpg|\jpeg|\svg|\png)$/i;

        console.log('Validating file type...')
        
        if (!allowedExtensions.exec(file.mimetype)) {
            error.push('fileTypeNotSupported')
            console.log('filetype: ' + file.mimetype)
            return error
          }

          console.log('Validating file size...')
          console.log('filetype: ' + file.size)
        if (file.size > maxFileSize) {
            error.push('fileSizeLimit')
        }
        return error
    }

    return exports
}