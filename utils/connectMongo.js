import mongoose from 'mongoose';
// import { MONGODB_URI } from '../config';

const connectMongo = async () => await mongoose.connect(process.env.MONGODB_URI);

export default connectMongo;