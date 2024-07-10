require('dotenv').config()

const express = require('express')
const eventRoutes = require('./routes/events')          // all tested
const clubRoutes = require('./routes/clubs')            // all tested
const { default: mongoose } = require('mongoose')


// express app
const app = express()

// middleware
app.use(express.json())           // pore lagbe
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 


// we need to react to requests using route handler (Node js + Express videos)
// routes 
app.use('/api/events/', eventRoutes)
app.use('/api/clubs/', clubRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to mongodb and listening on port', process.env.PORT)             // nodemon diye changes detected dynamically
        })
    })
    .catch((error) => {
        console.log((error))
    })
