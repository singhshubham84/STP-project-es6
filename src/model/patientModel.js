import { Schema, model } from "mongoose";

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contactDetails: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

export default model('patient', patientSchema)