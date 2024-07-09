import connectDB from './db.js';
import Department from '../models/Department.js';
import Doctor from '../models/Doctor.js';
import dotenv from 'dotenv';

dotenv.config({ path: './env.env' });

connectDB();

const departmentsData = [
  { name: 'Cardiology' },
  { name: 'Neurology' },
  { name: 'Orthopedics' },
];

const doctorsData = [
  { name: 'Dr. Rahul Patel' },
  { name: 'Dr. Priya Shah' },
  { name: 'Dr. Sanjay Kumar' },
  { name: 'Dr. Michael Johnson' },
  { name: 'Dr. Jennifer Smith' },
  { name: 'Dr. Emily Brown' },
  { name: 'Dr. Ethan Williams' },
  { name: 'Dr. Olivia Taylor' },
  { name: 'Dr. Benjamin Anderson' },
];

const initDepartments = async () => {
  try {
    await Department.deleteMany();
    const departments = await Department.insertMany(departmentsData);
    console.log('Departments initialized successfully');
    return departments;
  } catch (error) {
    console.error('Error initializing departments:', error);
  }
};

const initDoctors = async (departments) => {
  try {
    await Doctor.deleteMany();
    const doctors = [];
    let doctorIndex = 0;

    for (const department of departments) {
      const departmentDoctors = doctorsData.slice(doctorIndex, doctorIndex + 3).map(doctorData => ({
        ...doctorData,
        department: department._id,
      }));
      doctorIndex += 3;
      await Doctor.insertMany(departmentDoctors);
      doctors.push(...departmentDoctors);
    }

    console.log('Doctors initialized successfully');
    return doctors;
  } catch (error) {
    console.error('Error initializing doctors:', error);
  }
};

// Initialize database
const initDB = async () => {
  try {
    const departments = await initDepartments();
    await initDoctors(departments);
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default initDB;
