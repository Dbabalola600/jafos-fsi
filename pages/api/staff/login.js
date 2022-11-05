import connectMongo from "../../../utils/connectMongo";
import { setCookie } from "cookies-next";
import Staff from "../../../model/Staff/StaffModel";


export default async function Login(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { staffid, password } = JSON.parse(req.body)

        const existingStaff = await Staff.findOne({ staffid })

      
        if (!existingStaff) return res.status(401).json({ message: "invalid staff id" })


        const isStaff = await Staff.findOne({password})

        if (!isStaff) return res.status(401).json({ message: "invalid password" })


        const user = existingStaff._id

        setCookie('Staffuser', existingStaff._id,{ req, res , maxAge:86400} )//maxage in seconds

        return res.status(200).json({ message: "login successful", })



    }catch (error) {

        console.log(error);
        res.json({ error });
    }
}