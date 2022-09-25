import connectMongo from "../../../../utils/connectMongo"
import Student from "../../../../model/StudentModel"




export default async function fetchStudent(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('FETCHING Sellers');
        // const tests = await Test.findById({_id: req.body._id});

        const students = await Student.find()
        console.log('FETCHED Sellers');

        res.status(200).json(students)

        return

    } catch (error) {
        console.log(error);
        res.json({ error })
    }
}
