import connectMongo from '../../../utils/connectMongo';
import Test from '../../../model/testModel';
import Seller from '../../../model/Seller'
import Student from '../../../model/StudentModel';
import { getCookie } from 'cookies-next'
import JWT from 'jsonwebtoken';

export default async function fetchStudent(req, res) {
    try {

        const JWT_SECRET = "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5"


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('FETCHING DOCUMENTS');

        const token = getCookie("token", { req, res })
        console.log(token)
        //    const decoded=  JWT.verify(token, JWT_SECRET)

        //     console.log(decoded)



        const students = await Student.findById({ _id: token });

        console.log('FETCHED DOCUMENTS');

        res.status(200).json({
            students,
            token
        })

        return

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            notFound: true,
        });
    }
};

