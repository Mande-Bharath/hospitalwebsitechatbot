require('dotenv').config();

const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital-management';

const sampleDoctors = [
  {
    name: 'Dr. Maya Bennett',
    specialization: 'Cardiologist',
    department: 'Cardiology',
    qualification: 'MD, DM (Cardiology)',
    experience: 12,
    bio: 'Specializes in preventive cardiology, heart rhythm disorders, and post-operative rehabilitation.',
    consultationFee: 1200,
    image: '',
    isActive: true,
    phone: '+1 555 202 3120',
    email: 'maya.bennett@medicare.com',
    schedule: [
      {
        date: getISODate(0),
        slots: ['9:00 AM', '11:00 AM', '3:30 PM'],
      },
      {
        date: getISODate(1),
        slots: ['10:00 AM', '1:00 PM', '4:00 PM'],
      },
    ],
  },
  {
    name: 'Dr. Rahul Mehta',
    specialization: 'Neurologist',
    department: 'Neurology',
    qualification: 'MBBS, MD (Neurology)',
    experience: 15,
    bio: 'Focuses on stroke recovery, migraine management, and nerve-related disorders.',
    consultationFee: 1400,
    image: '',
    isActive: true,
    phone: '+1 555 208 6801',
    email: 'rahul.mehta@medicare.com',
    schedule: [
      {
        date: getISODate(0),
        slots: ['8:30 AM', '12:30 PM', '2:30 PM'],
      },
      {
        date: getISODate(2),
        slots: ['9:00 AM', '11:30 AM', '5:00 PM'],
      },
    ],
  },
  {
    name: 'Dr. Aisha Rahman',
    specialization: 'Dermatologist',
    department: 'Dermatology',
    qualification: 'MBBS, MD (Dermatology)',
    experience: 9,
    bio: 'Helps patients with skin conditions, cosmetic dermatology, and preventive skin care plans.',
    consultationFee: 1100,
    image: '',
    isActive: true,
    phone: '+1 555 210 5405',
    email: 'aisha.rahman@medicare.com',
    schedule: [
      {
        date: getISODate(1),
        slots: ['9:30 AM', '1:30 PM', '4:30 PM'],
      },
      {
        date: getISODate(3),
        slots: ['10:30 AM', '12:00 PM', '3:00 PM'],
      },
    ],
  },
  {
    name: 'Dr. Daniel Brooks',
    specialization: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    qualification: 'MS (Orthopedics), Fellowship in Joint Replacement',
    experience: 18,
    bio: 'Treats sports injuries, joint pain, and trauma with minimally invasive surgical expertise.',
    consultationFee: 1500,
    image: '',
    isActive: true,
    phone: '+1 555 214 9804',
    email: 'daniel.brooks@medicare.com',
    schedule: [
      {
        date: getISODate(0),
        slots: ['10:00 AM', '12:00 PM', '4:00 PM'],
      },
      {
        date: getISODate(4),
        slots: ['8:00 AM', '11:00 AM', '2:00 PM'],
      },
    ],
  },
];

function getISODate(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
}

async function seedDoctors() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Doctor.deleteMany({});
    const insertedDoctors = await Doctor.insertMany(sampleDoctors);

    console.log(`✅ Seeded ${insertedDoctors.length} doctors successfully.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seedDoctors();
