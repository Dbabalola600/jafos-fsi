import connectMongo from "../../../utils/connectMongo";
import Admin from "../../../model/Admin/AdminModel";





import { setCookie, getCookie, getCookies } from 'cookies-next'




/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
 export default async function Login(req, res) {


    try {
    
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { AdminId, password } = JSON.parse(req.body)


        const existingAdmin = await Admin.findOne({ AdminId })

        if (!existingAdmin) return res.status(401).json({ message: "invalid id " })

        //console.log(existingSeller)

        const isAdmin = await Admin.findOne({ password })
        if (!isAdmin) return res.status(401).json({ message: "Invalid password" })

        console.log(isAdmin)


        // const token = JWT.sign({ id: Seller._id }, JWT_SECRET);

        const user = existingAdmin._id
        setCookie('Adminuser', existingAdmin._id, { req, res, maxAge:86400 })



        console.log(user)
        return res.status(200).json({ message: "login successful" })






    } catch (error) {

        console.log(error);
        res.json({ error });
    }
}


