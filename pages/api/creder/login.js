import connectMongo from "../../../utils/connectMongo";

import { setCookie, getCookie, getCookies } from 'cookies-next'
import Creder from "../../../model/Creder/creder";



export default async function Login(req, res) {
    try {
        // const JWT_SECRET = "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5"
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { creder_no, password } = JSON.parse(req.body)


        const existingCreder = await Creder.findOne({ creder_no })

        if (!existingCreder) return res.status(401).json({ message: "invalid " })

        //console.log(existingSeller)

        const isCreder = await Creder.findOne({ password })
        if (!isCreder) return res.status(401).json({ message: "Invalid id or password" })

        console.log(isCreder)


        // const token = JWT.sign({ id: Seller._id }, JWT_SECRET);

        const user = existingCreder._id
        setCookie('Creduser', existingCreder._id, { req, res, maxAge:86400 })



        console.log(user)
        return res.status(200).json({ message: "login successful" })






    } catch (error) {

        console.log(error);
        res.json({ error });
    }
}
