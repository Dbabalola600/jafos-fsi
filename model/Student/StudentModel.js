import { Schema, model, models } from 'mongoose';
import bycrpt from 'bcryptjs'


const StudentSchema = new Schema({

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
  matricno: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
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


  // bank account 
  bankDetails: {
    type: Array,
    accountNo: {
      type: String,
      required: true
    },
    bankName: {
      type: String,
      required: true
    },
    AccountName: {
      type: String,
      required: true
    },
    BVN: {
      type: String,
      required: true
    }

  },


  //debit card
  cardDetails: {
    type: Array,
    CardNo: {
      type: String,
      required: true
    },
    CVV: {
      type: String,
      required: true
    },
    ExpiryDate: {
      type: String,
      required: true
    },
    pin: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    enum: ['student', 'seller', 'Admin', 'creder', 'staff'],
    default: 'student'
  },
},
  { timestamps: true }
);




const Student = models.Student || model('Student', StudentSchema);

export default Student;