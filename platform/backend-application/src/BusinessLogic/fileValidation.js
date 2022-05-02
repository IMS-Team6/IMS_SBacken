module.exports = function({ globals }) {
    const exports = {}

    exports.validateFileSize = function(file) {
        const error = [];
        const maxFileSize = 1024 * 1024 * 20; //Add to globals folder
        if (file.size > maxFileSize) {
            error.push('fileSizeLimit')
        }
        return error
    }
    return exports
}