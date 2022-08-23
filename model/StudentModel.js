import { Schema, model, models } from 'mongoose';
import bycrpt from 'bcryptjs'


const StudentSchema = new Schema({
  
  firstname: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
    unique: true,
  },
  matricno: {
    type: Number,
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
  role: {
    type: String,
    enum: ['student', 'seller'  ],
    default: 'student'
  }
});




const Student = models.Student || model('Student', StudentSchema);

export default Student;