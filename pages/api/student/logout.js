import connectMongo from "../../../utils/connectMongo";
import Student from "../../../model/StudentModel";
import { getCookie } from "cookies-next";


/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */





export default async function Logout(req, res) {

    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const user = getCookie("user", {req,res})


        const existingUser = await StudentModel.findById({ user })
       

        if (!existingUser) return res.status(401).json({ message: "Invalid " })



        return res.status(200).json({ message: "logot successful" })


    } catch (error) {
        console.log(error);
        res.json({ error });
    }


}