const express = require('express')

const router = express.Router()
const {
    getAllClubs,
    getClub,
    createClub, 
    deleteClub, 
    updateClub
} = require('../controllers/clubController')



// GET all clubs
router.get('/', getAllClubs)


// GET a single club
router.get('/:id', getClub)


// POST a new club
router.post('/', createClub)
 

// DELETE a club
router.delete('/:id', deleteClub)

                                                          
// PATCH a club
router.patch('/:id', updateClub)


module.exports = router