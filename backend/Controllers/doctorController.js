import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const updateDoctor = async(req,res)=>{
  const id = req.params.id
  try{
    const updateDoctor = await Doctor.findByIdAndUpdate(id,{$set:req.body},{new:true})

    res.status(200).json({success:true,message:'successfully updated',data:updateDoctor})
  }
  catch(error){
    res.status(500).json({success:false,message:"failed update"})
  }
}

export const deleteDoctor = async(req,res)=>{
  const id = req.params.id
  try{
    const updateDoctor = await Doctor.findByIdAndDelete(id,{$set:req.body},{new:true})

    res.status(200).json({success:true,message:'successfully deleted',data:updateDoctor})
  }
  catch(error){
    res.status(500).json({success:false,message:"failed deletion"})
  }
}
export const getSingleDoctor = async(req,res)=>{
  const id = req.params.id
  try{
    const doctor = await Doctor.findById(id).populate('reviews').select('-password')

    res.status(200).json({success:true,message:'Doctor  found',data:doctor})
  }
  catch(error){
    res.status(404).json({success:false,message:"no Doctor found"})
  }
}
export const getAllDoctors = async(req,res)=>{

  try{

    const {query} = req.query
    let doctors;
    if(query){
      doctors = await Doctor.find({isApproved:'approved',$or:[{name:{$regex:query,$options:"i"}},],
      }).select('-password')
    }
    else{
      doctors = await Doctor.find({isApproved:"approved"}).select("-password");
    }

    res.status(200).json({success:true,message:'Doctor found',data:doctors})
  }
  catch(error){
    res.status(404).json({success:false,message:"not found"})
  }
}

export const getDoctorProfile = async(req,res)=>{
  const doctorId = req.userId;
try {
  console.log('Fetching doctor profile for ID:', doctorId);
  
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return res.status(404).json({ success: false, message: "Doctor not found" });
  }
  
  const { password, ...rest } = doctor._doc;
  
  let appointments;
  try {
    appointments = await Booking.find({ doctor: doctorId });
  } catch (queryError) {
    console.error('Error fetching appointments:', queryError);
    return res.status(500).json({ success: false, message: "Error fetching appointments" });
  }
  
  console.log('Doctor and appointments fetched successfully');
  
  res.status(200).json({
    success: true,
    message: "Profile info is getting",
    data: { ...rest, appointments },
  });
  
} catch (error) {
  console.error('Error fetching doctor profile:', error);
  res.status(500).json({ success: false, message: "Something went wrong, cannot get" });
}

}