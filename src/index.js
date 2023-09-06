import express from 'express'
import { connect } from "mongoose";
const app = express()
import pkg from 'body-parser'
import route from './route/route.js'
const { json } = pkg
app.use(json())

connect("mongodb+srv://shubhamsingh:7Q5S1ApAtvGYiNzT@cluster0.3t74x.mongodb.net/stpAssignment")
    .then(() => console.log("mogodb is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000, () => {
    console.log("Express app running on Port" + (process.env.PORT || 3000))
})




// app.get("/api", (req, res) => {
//     console.log("first")
// });
// app.listen(3000, () => { console.log("listen on port 3000") })