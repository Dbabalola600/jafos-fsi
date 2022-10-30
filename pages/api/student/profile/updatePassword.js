import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";


export default async function updatePassword(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { id, n_pass } = JSON.parse(req.body)


        const updatepassword = await Student.findById(id).updateOne({ password: n_pass })

        return res.status(200).json({ message: "PASSWORD CHANGED SUCESSFULLY" })



    } else {
        return res.status(400).json({
            message: "wrong request",
        });
    }

}
