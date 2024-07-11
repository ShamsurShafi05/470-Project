const Event = require('../models/eventModel')
const mongoose = require('mongoose')


// get all events
const getAllEvents = async (req, res) => {
    const allEvents = await Event.find({})            
    // specific kisu find korte do .find({approval: 1})
    // sort korte do .find({}).sort({createdAt: -1}) => -1 for descending order

    res.status(200).json(allEvents)
    // SENDING RESPONSE WITH JSON
}


// get single event
const getEvent = async (req, res) => {
    const { id } = req.params                                               // like React er params and grabbing :id
    
    // validate the ID to avoid mongoose crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event; Invalid ID'})
    }
    
    const singleEvent = await Event.findById(id)

    if (!singleEvent) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(singleEvent)
}



// create new event
const createEvent = async (req, res) => {
    const {title, tagline, organizer, date, location, time, 
        description, highlights, faq, like, approval, link} = req.body


    // try block bc error hote pare while creating document
    try {
        const event = Event.create({title, tagline, organizer, date, location, 
            time, description, highlights, faq, like, approval, link})

        res.status(200).json(event)
        } 
    catch (error) {
        res.status(400).json({error: error.message})
    }    
     // Remove this line as it will cause an attempt to send another response
    // res.json({ msg: "POST a new event" });
}



// delete event
const deleteEvent = async (req, res) => {
    const { id } = req.params                                               // like React er params and grabbing :id
    
    // validate the ID to avoid mongoose crash/internal error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event; Invalid ID'})
    }

    const deleted = await Event.findOneAndDelete({_id: id})                            // json objects e prop is _id

    // need to check if we have a value for 'deleted'
    if (!deleted) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(deleted)
}



// update event
const updateEvent = async (req, res) => {
    const { id } = req.params                                               // like React er params and grabbing :id
    
    // validate the ID to avoid mongoose crash/internal error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event; Invalid ID'})
    }

    const updated = await Event.findOneAndUpdate({_id: id}, {
        ...req.body             // req e body thakbe for UPDATE request just like POST request; we are spreading the object req.body
    })

    if (!updated) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(updated)
}


// Find approved events
const findApprovedEvents = async (req, res) => {
    try {
        console.log("Finding approved events..."); // Debugging statement
        const approvedEvents = await Event.find({ approval: 1 }).sort({ date: 1 });
        console.log("Approved events found:", approvedEvents); // Debugging statement

        if (approvedEvents.length === 0) {
            return res.status(404).json({ error: 'No approved events found.' });
        }

        res.status(200).json(approvedEvents);
    } catch (error) {
        console.error('Error finding approved events:', error);
        res.status(500).json({ error: 'Could not find approved events.' });
    }
}




module.exports = {
    getAllEvents,
    getEvent,
    createEvent, 
    deleteEvent, 
    updateEvent,
    findApprovedEvents
}