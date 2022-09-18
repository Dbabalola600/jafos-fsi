import connectMongo from '../../../utils/connectMongo';
import StudentModel from '../../../model/StudentModel';
import { error } from 'console';
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';

import Seller from '../../../model/Seller/Seller';

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

        const { storename, password } = JSON.parse(req.body)


        const existingSeller = await Seller.findOne({ storename })

        if (!existingSeller) return res.status(401).json({ message: "invalid " })

        //console.log(existingSeller)

        const isSeller = await Seller.findOne({ password })
        if (!isSeller) return res.status(401).json({ message: "Invalid matric no or password" })

        console.log(isSeller)


        // const token = JWT.sign({ id: Seller._id }, JWT_SECRET);

        const user = existingSeller._id
        setCookie('user', existingSeller._id, { req, res, maxAge:86400 })



        console.log(user)
        return res.status(200).json({ message: "login successful" })






    } catch (error) {

        console.log(error);
        res.json({ error });
    }
}




