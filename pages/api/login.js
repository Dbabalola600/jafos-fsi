import connectMongo from '../../utils/connectMongo';
import StudentModel from '../../model/StudentModel';
import { error } from 'console';
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';
import Student from '../../model/StudentModel';
import Seller from '../../model/Seller'
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
        // const authTokens = await this.generateAuthenticationTokens({ id: Student._id })



        const existingStudent = await StudentModel.findOne({ matricno })

        if (!existingStudent) return res.status(401).json({ message: "Invalid matric no or password" })

        // console.log(existingStudent)
        const isStudent = await bcryptjs.compare(password, existingStudent.password)

        if (!isStudent) return res.status(401).json({ message: "Invalid matric no or password" })


        // const token = JWT.sign({ id: Student._id }, JWT_SECRET);
        //const student = await StudentModel.findOne({_id})
        //console.log(existingStudent._id)

        const token = existingStudent._id

        console.log(token)

        setCookie('token', existingStudent._id, { req, res })
       


        return res.status(200).json({ message: "login successful", })






    } catch (error) {

        console.log(error);
        res.json({ error });
    }
}




