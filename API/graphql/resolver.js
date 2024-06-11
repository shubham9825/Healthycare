import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const resolvers = {
  Mutation: {
    signup: async (_, { email, password }) => {
      try {
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
          throw new Error('Email already exists');
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

        return { token, user: newUser};
      } catch (error) {
        throw error;
      }
    },
    login: async (_, { email, password }) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        return { token, user };
      } catch (error) {
        throw error;
      }
    },
  },
};

export default resolvers;
