import mongoose, { Schema, model, models } from 'mongoose';

const testSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },

  order:{
    type : mongoose.Schema.ObjectId,
    ref: 'TestOrder',
    required: false,
    unique: false
  }
});

const Test = models.Test || model('Test', testSchema);

export default Test;