const express = require('express');

const Doctor = require('../models/Doctor');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({ isActive: true }).sort({ specialization: 1, name: 1 });

    return res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error('Get doctors error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch doctors.',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found.',
      });
    }

    return res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.error('Get doctor by ID error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch doctor details.',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const doctorData = req.body;

    const doctor = await Doctor.create(doctorData);

    return res.status(201).json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.error('Create doctor error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to create doctor profile.',
    });
  }
});

module.exports = router;
