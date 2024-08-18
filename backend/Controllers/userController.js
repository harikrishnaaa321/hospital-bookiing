import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndDelete(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "successfully deleted",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed deletion" });
  }
};
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({ success: true, message: "user found", data: user });
  } catch (error) {
    res.status(404).json({ success: false, message: "no user found" });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({ success: true, message: "user found", data: users });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "something went wrong,cannot get" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId });
    console.log(22);
    
    const doctorIds = bookings.map((booking) => booking.doctor._id);

    const doctors = await Doctor.find({
      _id: { $in: doctorIds },
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Appointments retrieved",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ success: false, message:"eeeee"});
  }
};
