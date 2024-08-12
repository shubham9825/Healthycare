import UserProfile from "../../models/UserProfile.js";

const userProfileResolver = {
  Query: {
    getUserProfile: async (_, { userId }) => {
      try {
        const userProfile = await UserProfile.findOne({ userId });
        return userProfile;
      } catch (error) {
        throw new Error("Error fetching user profile");
      }
    },
  },
  Mutation: {
    createUserProfile: async (_, { input }, { req }) => {
      try {
        const user = req?.user?.userId;
        // Ensure that 'user.id' is available and valid
        if (!user) {
          throw new Error("User not authenticated");
        }

        const newUserProfile = new UserProfile({
          ...input,
          userId: user,
        });

        await newUserProfile.save();
        return newUserProfile;
      } catch (error) {
        console.error("Error creating user profile:", error);
        throw new Error("Error creating user profile");
      }
    },
    updateUserProfile: async (_, { userId, input }) => {
      try {
        const updatedUserProfile = await UserProfile.findOneAndUpdate(
          { userId },
          { $set: input },
          { new: true, runValidators: true, upsert: false }
        );
        if (!updatedUserProfile) {
          throw new Error("User profile not found");
        }
        return updatedUserProfile;
      } catch (error) {
        throw new Error("Error updating user profile");
      }
    },
  },
};

export default userProfileResolver;
