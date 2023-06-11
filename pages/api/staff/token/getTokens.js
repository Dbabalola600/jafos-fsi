import connectMongo from "../../../../utils/connectMongo";
import Token from "../../../../model/Creder/Token";
import Staff from "../../../../model/Staff/StaffModel"

export default async function GetToken(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)
        const user = await Staff.findById(id)

        const token = await Token.find({ user: user.staffid }).find({ status: "available" })


        return res.status(200).json(token)
    } else {
        return res.status(400).json({
            message: "wrong request",
        });
    }
}