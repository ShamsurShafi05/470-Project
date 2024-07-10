const Club = require('../models/clubModel')
const mongoose = require('mongoose')


// get all clubs
const getAllClubs = async (req, res) => {
    const allClubs = await Club.find({})            

    res.status(200).json(allClubs)
}


// get single club
const getClub = async (req, res) => {
    const { id } = req.params                                              
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such club; Invalid ID'})
    }
    
    const singleClub = await Club.findById(id)
    if (!singleClub) {
        return res.status(404).json({error: 'No such club'})
    }

    res.status(200).json(singleClub)
}


// create new club
const createClub = async (req, res) => {
    const {title, abbreviation, description, password, contactInformation, panel, 
        advisor, events} = req.body

    try {
        const club = Club.create({title, abbreviation, description, password, 
            contactInformation, panel, advisor, events})

        res.status(200).json(club)
        } 
    catch (error) {
        res.status(400).json({error: error.message})
    }    
}


// delete club
const deleteClub = async (req, res) => {
    const { id } = req.params                                               
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such club; Invalid ID'})
    }

    const deleted = await Club.findOneAndDelete({_id: id}) 
    if (!deleted) {
        return res.status(404).json({error: 'No such club'})
    }

    res.status(200).json(deleted)
}


// update club
const updateClub = async (req, res) => {
    const { id } = req.params                                
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such club; Invalid ID'})
    }

    const updated = await Club.findOneAndUpdate({_id: id}, {
        ...req.body           
    })
    if (!updated) {
        return res.status(404).json({error: 'No such club'})
    }

    res.status(200).json(updated)
}

module.exports = {
    getAllClubs,
    getClub,
    createClub, 
    deleteClub, 
    updateClub
}