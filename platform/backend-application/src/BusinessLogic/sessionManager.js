module.exports = function({positionValidation,database}){

    const exports = {}
    exports.manageSession = async function(session){
        const errors = positionValidation.validatePosition(session)
          if(errors.length > 0){
            return errors
   }
    return await database.getSession()

    }


    return exports
}
