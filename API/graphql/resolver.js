import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const resolvers = {
  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

        return { token, user: newUser };
      } catch (error) {
        throw new Error('Signup failed');
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
        throw new Error('Login failed');
      }
    },
  },
};

export default resolvers;
