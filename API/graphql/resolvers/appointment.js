import Appointment from "../../models/Appointment.js";
import Department from "../../models/Department.js";
import Doctor from "../../models/Doctor.js";
import mongoose from "mongoose";
import axios from "axios";
import nodemailer from "nodemailer";
import moment from "moment-timezone";
import UserProfile from "../../models/UserProfile.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: "shubhsheliya211@gmail.com",
    pass: "sicjlrufunqlnwqm",
  },
});

const appointmentResolvers = {
  Query: {
    getAppointments: async (_, { userId }, { user }) => {
      try {
        if (!user) {
          throw new Error("User Not Authenticated");
        }
        const appointments = await Appointment.find({ user: userId });
        return appointments;
      } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new Error("Error fetching appointments");
      }
    },
  },
  Mutation: {
    createAppointment: async (_, { input }, { req }) => {
      try {
        const { department, doctor, date, userId, doctorId } = input;
        const departmentExists = await Department.exists({ name: department });
        if (!departmentExists) {
          throw new Error("Department not found");
        }

        const doctorExists = await Doctor.exists({ name: doctor });
        if (!doctorExists) {
          throw new Error("Doctor not found");
        }
        const userTimeZone = "America/Toronto";
        const dateObject = moment.tz(date, userTimeZone);
        const utcDate = dateObject.utc();
        const appointment = new Appointment({
          user: new mongoose.Types.ObjectId(userId),
          doctor: new mongoose.Types.ObjectId(doctorId),
          date: utcDate.format("YYYY-MM-DD"),
          time: utcDate.format("HH:mm:ss"),
        });
        await appointment.save();

        const populatedAppointment = await Appointment.findById(appointment._id)
          .populate("user")
          .populate("doctor")
          .exec();
        const accessToken = req.session.accessToken;
        if (!accessToken) {
          throw new Error("Zoom access token is missing");
        }

        const meetingData = {
          topic: `Appointment with ${doctor}`,
          type: 2,
          start_time: utcDate.format(),
          duration: 30,
          timezone: "UTC",
        };

        const response = await axios.post(
          "https://zoom.us/v2/users/me/meetings",
          meetingData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const meetingDetails = response.data;

        const localTime = moment
          .utc(meetingDetails.start_time)
          .tz(userTimeZone)
          .format("MMMM DD, YYYY, HH:mm");

        const mailOptions = {
          from: "shubhsheliya211@gmail.com",
          to: [
            populatedAppointment.user.email,
            populatedAppointment.doctor.email,
            "Milapprajapati707070@gmail.com",
            "shubhamsheliya9825@gmail.com",
          ],
          subject: "New Zoom Meeting Scheduled",
          text: `
Hello,

A new meeting has been scheduled for your upcoming appointment.

Topic: ${meetingDetails.topic}
Department : ${department}
Start Time: ${localTime}
Meeting URL: ${meetingDetails.join_url}

Thank you for choosing HealthyCareLife.
Best regards,
HealthyCareLife Team
`,
        };

        transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            throw new Error("Error sending email");
          } else {
            console.log("Email sent:", info.response);

            // Store the activity in the user's profile
            const activity = `Appointment with ${
              populatedAppointment.doctor.name
            } on ${dateObject.format("MMMM DD, YYYY")} at ${dateObject.format(
              "HH:mm:ss"
            )} - Zoom Meeting: ${meetingDetails.join_url}`;

            try {
              await UserProfile.findOneAndUpdate(
                { userId: populatedAppointment.user._id },
                { $push: { activity } },
                { new: true, runValidators: true }
              );
            } catch (err) {
              console.error("Error updating user profile activity:", err);
              throw new Error("Error updating user profile activity");
            }
          }
        });

        return {
          ...populatedAppointment._doc,
          id: populatedAppointment._id.toString(),
          user: {
            ...populatedAppointment.user._doc,
            id: populatedAppointment.user._id.toString(),
          },
          doctor: {
            ...populatedAppointment.doctor._doc,
            id: populatedAppointment.doctor._id.toString(),
          },
        };
      } catch (error) {
        console.error("Error creating appointment:", error);
        throw new Error("Error creating appointment");
      }
    },
  },
};

export default appointmentResolvers;
