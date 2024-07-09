import Doctor from '../../models/Doctor.js';
import Department from '../../models/Department.js';
import mongoose from 'mongoose';
const doctorResolvers = {
  Query: {
    doctors: async (_, { departmentId }) => {
      try {
        // Ensure departmentId is valid ObjectId format
        if (!mongoose.isValidObjectId(departmentId)) {
          throw new Error('Invalid departmentId');
        }

        // Fetch doctors filtered by departmentId
        const doctors = await Doctor.find({ department: departmentId });

        return doctors;;
      } catch (error) {
        console.error('Error fetching doctors:', error);
        throw new Error('Failed to fetch doctors');
      }
    },
  },
  Doctor: {
    department: async (doctor) => {
      try {
        // Fetch department details using the ObjectId stored in doctor's department field
        const department = await Department.findById(doctor.department);

        if (!department) {
          throw new Error('Department not found');
        }

        return department;
      } catch (error) {
        console.error('Error fetching department for doctor:', error);
        throw new Error('Failed to fetch  department');
      }
    },
  },
};

export default doctorResolvers;
