module.exports = function(){
    const exports = {}
    exports.validateSession = function(session){
        
    }

    exports.validatePosition = function(positions){
        const error = [];
        if((positions.posX || positions.posY) == null){
           error.push("postion can not be empty")
        }
        return error
    }
    return exports
}