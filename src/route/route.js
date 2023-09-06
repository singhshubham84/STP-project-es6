import { Router } from "express";
const router=Router();
import {createPatient, deletePatient, getPatient, updatePatient  } from "../controller/patientController.js";

router.post('/createpatient',createPatient)
router.get('/getpatient',getPatient)
router.delete('/deletepatient',deletePatient)
router.put('/updatepatient/:id',updatePatient)

export default router