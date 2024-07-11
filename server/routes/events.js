const express = require('express')

const router = express.Router()
const {
    getAllEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent, 
    findApprovedEvents
} = require('../controllers/eventController')
 

// GET all events
router.get('/', getAllEvents)


// GET a single event
router.get('/:id', getEvent)


// POST a new event
router.post('/', createEvent)
 

// DELETE an event
router.delete('/:id', deleteEvent)

                                                          
// PATCH an event
router.patch('/:id', updateEvent)


// GET approved events
router.get('/approved', findApprovedEvents);



module.exports = router