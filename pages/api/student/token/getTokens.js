import Token from "../../../../model/Creder/Token";
import Student from "../../../../model/Student/StudentModel";
import connectMongo from "../../../../utils/connectMongo";



export default async function GetToken(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)

        const user = await Student.findById(id)
        console.log(user)

        const token = await Token.find({ user: user.matricno }).find({status: "available"})

        return res.status(200).json(token)


    } else {
        return res.status(400).json({
            message: "wrong request",
        });
    }
}