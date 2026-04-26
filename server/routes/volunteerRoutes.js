const express = require('express');
const router = express.Router();
const { createVolunteer, getVolunteers } = require('../controllers/volunteerController');

router.post('/', createVolunteer);
router.get('/', getVolunteers);

module.exports = router;