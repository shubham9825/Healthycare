import Department from '../../models/Department.js';

const departmentResolvers = {
  Query: {
    departments: async () => {
      return await Department.find();
    },
  },
};

export default departmentResolvers;
