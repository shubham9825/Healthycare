import connectDB from './db.js';
import Department from '../models/Department.js';
import Doctor from '../models/Doctor.js';
import dotenv from 'dotenv';

dotenv.config({ path: './env.env' });
const mongoURI = process.env.URL_DB;
console.log("mONGO",mongoURI);

connectDB();

const departmentsData = [
  { name: 'Cardiology' },
  { name: 'Neurology' },
  { name: 'Orthopedics' },
];

const doctorsData = [
  { name: 'Dr. Rahul Patel', department: null },
  { name: 'Dr. Priya Shah', department: null },
  { name: 'Dr. Sanjay Kumar', department: null },

  { name: 'Dr. Michael Johnson', department: null },
  { name: 'Dr. Jennifer Smith', department: null },
  { name: 'Dr. Emily Brown', department: null },

  { name: 'Dr. Ethan Williams', department: null },
  { name: 'Dr. Olivia Taylor', department: null },
  { name: 'Dr. Benjamin Anderson', department: null },
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
    const doctors = [];
    for (const department of departments) {
      const departmentDoctors = doctorsData
        .filter(doctorData => doctorData.department === null)
        .splice(0, 3)
        .map(doctorData => ({
          ...doctorData,
          department: department._id,
        }));
      await Doctor.insertMany(departmentDoctors);
      doctors.push(departmentDoctors);
    }
    console.log('Doctors initialized successfully');
    return doctors.flat();
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
