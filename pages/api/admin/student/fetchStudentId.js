import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/StudentModel";







export default async function fetchStudentId(req, res) {

    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { _id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');

        const student = await Student.findById(_id)
        console.log("FETCHED STUDENTS")

        // console.log(student)
        return res.status(200).json(
            student
        )


    } else {

        return res.status(400).json({
            notFound: true,
        });

    }

}