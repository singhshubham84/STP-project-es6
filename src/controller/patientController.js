import patientModel from '../model/patientModel.js'
import { isValidName, isValidNumber, isValidObjectId, isValid, isValidPincode } from "../validation/validation.js";

const createPatient = async (req, res) => {
    try {
        let data = req.body
        let { name, contactDetails, address, pincode } = data
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'name is Required' })
        }
        if (!isValidName(name)) {
            return res.status(400).send({ status: false, message: `${name} is not valid` })
        }
        if (!isValid(contactDetails)) {
            return res.status(400).send({ status: false, message: 'phone number is Required' })
        }

        if (!isValidNumber(contactDetails)) {
            return res.status(400).send({ status: false, message: "Phone number must be a valid Indian number.it should start with 6,7,8 or 9" })
        }
        if (!isValid(address)) {
            return res.status(400).send({ status: false, message: 'Address is Required' })
        }
        if (!isValid(pincode)) {
            return res.status(400).send({ status: false, msg: 'please provide pincode' })
        }
        if (!isValidPincode(pincode)) {
            return res.status(400).send({ status: false, message: 'Please provide valid pincode' })
        }

        const createdPatientData = await patientModel.create(data)
        return res.status(201).send({ createdPatientData })

    }
    catch (err) {
        return res.status(500).send({
            status: false, err: err.message
        })

    }
}

const getPatient = async (req, res) => {
    try {
        let ID = req.query.id

        if (ID) {
            if (!isValidObjectId(ID)) {
                return res.status(400).send({ status: false, message: "Invalid UserId" })
            }
            let patientData = await patientModel.findOne({ _id: ID, isDeleted: false }, { isDeleted: 0, __v: 0 })
            return res.status(200).send({ patientData })
        } else {
            let patientData = await patientModel.find({ isDeleted: false }, { isDeleted: 0, __v: 0 })
            return res.status(200).send({ patientData })
        }
    } catch (err) {
        return res.status(500).send({
            status: false, err: err.message
        })
    }
}
const deletePatient = async (req, res) => {
    try {
        let id = req.query.id

        if (!isValidObjectId(id)) {
            return res.status(400).send({ status: false, message: "Invalid UserId" })
        }
        const getPatientDetails = await patientModel.find({ _id: id, isDeleted: false })
        if (getPatientDetails.length === 0) {
            return res.status(200).send({ message: "there is no patient available with this id" })
        } else {
            const deletedPatient = await patientModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true })
            return res.status(200).send({ deletedPatient })
        }
    } catch (err) {
        return res.status(500).send({
            status: false, err: err.message
        })
    }
}

const updatePatient = async (req, res) => {
    try {
        let id = req.params.id
        if (!isValidObjectId(id)) {
            return res.status(400).send({ status: false, message: "Invalid UserId" })
        }
        let data = req.body
        let { name, contactDetails, address, pincode } = data
        let patientDbData = await patientModel.findOne({ _id: id, isDeleted: false })
        if (name) {
            if (!isValidName(name)) {
                return res.status(400).send({ status: false, message: `${name} is not valid` })
            }
            patientDbData.name = name
        }
        if (contactDetails) {
            if (!isValidNumber(contactDetails)) {
                return res.status(400).send({ status: false, message: "Phone number must be a valid Indian number.it should start with 6,7,8 or 9" })
            }
            patientDbData.contactDetails = contactDetails
        }
        if (address) {
            patientDbData.address = address
        }
        if (pincode) {
            if (!isValidPincode(pincode)) {
                return res.status(400).send({ status: false, message: 'Please provide valid pincode' })
            }
            patientDbData.pincode = pincode
        }
        await patientDbData.save()

        return res.status(200).send({ patientDbData })

    } catch (err) {
        return res.status(500).send({
            status: false, err: err.message
        })
    }
}
export { createPatient, getPatient, deletePatient, updatePatient }