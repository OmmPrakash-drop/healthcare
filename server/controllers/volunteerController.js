const Volunteer = require('../models/Volunteer');

exports.createVolunteer = async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json({
      success: true,
      message: 'Volunteer registration submitted successfully',
      data: volunteer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};