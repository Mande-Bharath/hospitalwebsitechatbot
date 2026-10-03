const express = require('express');

const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { authenticateToken } = require('./auth');

const router = express.Router();

router.post('/book', authenticateToken, async (req, res) => {
  try {
    const { doctorId, appointmentDate, slot, notes } = req.body;

    if (!doctorId || !appointmentDate || !slot) {
      return res.status(400).json({
        success: false,
        message: 'Doctor, date, and appointment time are required.',
      });
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found.',
      });
    }

    const scheduleFound = doctor.schedule.some(
      (entry) => entry.date === appointmentDate && entry.slots.includes(slot)
    );

    if (!scheduleFound) {
      return res.status(400).json({
        success: false,
        message: 'Selected slot is not available for this doctor.',
      });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor: doctorId,
      appointmentDate,
      slot,
      notes: notes || '',
      status: 'pending',
    });

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully.',
      appointment,
    });
  } catch (error) {
    console.error('Book appointment error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to book the appointment.',
    });
  }
});

router.get('/my', authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate('doctor', 'name specialization department consultationFee')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error('Get appointments error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch appointments.',
    });
  }
});

module.exports = router;
