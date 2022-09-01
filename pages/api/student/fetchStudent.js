import connectMongo from '../../../utils/connectMongo';
import Test from '../../../model/testModel';
import Seller from '../../../model/Seller'
import Student from '../../../model/StudentModel';
import { getCookie, getCookies, hasCookie } from 'cookies-next'
import JWT from 'jsonwebtoken';

export default async function fetchStudent(req, res) {


    // const JWT_SECRET = "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5"
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { _id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');


        // const token = getCookies( { req, res, path:'/', domain:'localhost' })
        // console.log(token)

        const student = await Student.findById(_id);

        console.log('FETCHED STUDENT');
        // console.log(student)
        return res.status(200).json({
            student,

        })
    }
    else {

        return res.status(400).json({
            notFound: true,
        });

    }




};

