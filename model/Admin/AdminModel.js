import { Schema, model, models } from 'mongoose';





const AdminSchema = new Schema ({
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
      AdminId: {
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
        enum: ['student', 'seller', "Admin",'creder'  ],
        default: 'Admin'
      },
},
{timestamps: true}
)



const Admin = models.Admin || model("Admin", AdminSchema);
export default Admin 