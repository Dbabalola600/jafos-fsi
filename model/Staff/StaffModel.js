import {Schema, model , models} from 'mongoose';


const StaffSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique: false,
      },
      lastname: {
        type: String,
        required: true,
        unique: false,
      },
      staffid: {
        type: String,
        required: true,
        unique: true,
      }, password: {
        type: String,
        required: true,
        unique: false,
      },
      account_bal: {
        type: Number,
        default: 400.50
      },
      pin: {
        type: String,
        default: "1234",
        length: 4
      },
      role: {
        type: String,
        enum: ['student', 'seller', 'Admin','creder','staff'],
        default: 'staff'
      },
},
{ timestamps: true }
);




const Staff = models.Staff ||model("Staff", StaffSchema);
export default Staff;