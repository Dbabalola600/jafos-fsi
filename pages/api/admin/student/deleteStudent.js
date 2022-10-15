import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/StudentModel";

export default async function deleteStudent(req, res) {

    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { user } = JSON.parse(req.body)
        const delOne = await Student.deleteOne({ _id: user });
        console.log("DELETED DOCUMENT ")

        return res.status(200).json(
            delOne
        )


    }else {
        return res.status(400).json({
            notFound: true,
        });
    }





}