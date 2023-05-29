import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";



export default async function SearchStudent(req, res) {
    if (req.method === "POST") {
        await connectMongo();


        const { find } = JSON.parse(req.body)

        const target = await Student.find({ matricno: find })


      
        return res.status(200).json(...target)


    } else {
        return res.status(400).json({
            message: "WRONG REQUEST"
        })
    }
}
