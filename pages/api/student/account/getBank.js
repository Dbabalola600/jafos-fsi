import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";




export default async function fetchStudentBanks(req, res) {


    // const JWT_SECRET = "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5"
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');


        // const token = getCookies( { req, res, path:'/', domain:'localhost' })
        // console.log(token)

        const student = await Student.findById(id).select("bankDetails");

        console.log('FETCHED STUDENT');
        // console.log(student)
        return res.status(200).json(
            student.bankDetails
        )
    }
    else {

        return res.status(400).json({
            notFound: true,
        });

    }




};

