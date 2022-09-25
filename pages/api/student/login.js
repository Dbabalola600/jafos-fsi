import connectMongo from '../../../utils/connectMongo';
import StudentModel from '../../../model/StudentModel';
import { error } from 'console';
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';
import Student from '../../../model/StudentModel';

import { setCookie, getCookie, getCookies } from 'cookies-next'
import cookies from 'next-cookies'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function Login(req, res) {
    try {
        // const JWT_SECRET = "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5"
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { matricno, password, _id } = JSON.parse(req.body)


        const existingStudent = await StudentModel.findOne({ matricno })

        if (!existingStudent) return res.status(401).json({ message: "Invalid matric no or password" })


        // const isStudent = await bcryptjs.compare(password, existingStudent.password)
        const isStudent = await StudentModel.findOne({ password })

        if (!isStudent) return res.status(401).json({ message: "Invalid matric no or password" })

        const user = existingStudent._id

        console.log(user)

        setCookie('Normuser', existingStudent._id, { req, res , maxAge:86400})  //maxage in seconds



        return res.status(200).json({ message: "login successful", })






    } catch (error) {

        console.log(error);
        res.json({ error });
    }
}




