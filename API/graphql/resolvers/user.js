import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';



const userResolvers = {
  Query: {
    hello: () => 'Hello world!',
    getAppointments: async (_, { userId }) => {
    },
    user: async (_, { email }) => {
      try {
        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Error fetching user');
      }
    },
  },
  Mutation: {
    signup: async (_, { email, password }) => {
      try {
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
          throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

        return { token, user: newUser};
      } catch (error) {
        throw error;
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        return { token, user };
      } catch (error) {
        throw error;
      }
    },
  },
};

export default userResolvers;
