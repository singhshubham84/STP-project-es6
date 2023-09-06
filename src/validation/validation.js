import mongoose from "mongoose"

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false 
    if (typeof value === 'string' && value.trim().length === 0) return false 
    return true;
};
const isValidName=function(name){
    let nameRegex=/^[a-zA-z]*$/
    return nameRegex.test(name)
}

const isValidNumber =function(number){
    let numberRegex=/^[0]?[6789]\d{9}$/
    return numberRegex.test(number)
}
const isValidPincode = function (pincode) {
    let pincodeRegex = /^\d{6}$/
    return pincodeRegex.test(pincode)
}

export {isValidName,isValidNumber,isValidObjectId,isValid,isValidPincode}