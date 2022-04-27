module.exports = function({ positionValidation, database }) {

    const exports = {}
    exports.manageSession = async function(session, callback) {
        const errors = positionValidation.validatePosition(session)
        console.log(errors)
        if (errors.length > 0) {
            callback(null, errors)
            return
        }
        const x = await database.getSessions()
        callback(x, errors)
        return

    }


    return exports
}