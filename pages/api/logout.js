import connectMongo from '../../utils/connectMongo';
import StudentModel from '../../model/StudentModel';
import { error } from 'console';
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';
import Student from '../../model/StudentModel';




/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function Logout(req, res, data) {
    try {
        const JWT_SECRET ="ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5"
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const existingUser = await StudentModel.findOne({ matricno })
   
        
        return res.status(200).json({ message: "logot successful"})
     




    } catch (error) {

        console.log(error);
        res.json({ error });
    }
}




