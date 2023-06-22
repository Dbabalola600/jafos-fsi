import connectMongo from "../../../../utils/connectMongo"
import Student from "../../../../model/Student/StudentModel"




export default async function fetchStudent(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        //using pagination 

        const ITEMS_PER_PAGE = 10;

        const page = req.query.page || 1



        //to skip items 
        const skip = (page - 1) * ITEMS_PER_PAGE

        //put all query params here
        const query = {}


        const countPromise = Student.estimatedDocumentCount(query)

        const studentsPromsie = Student.find(query)
            .limit(ITEMS_PER_PAGE)
            .skip(skip)




        const [count, students] = await Promise.all([countPromise, studentsPromsie])
        console.log('FETCHED Students');

        const pageCount = count / ITEMS_PER_PAGE;

        return res.status(200).json(
            {
                pagination: {
                    count,
                    pageCount
                },
                students
            }
        )

    } catch (error) {
        console.log(error);
        res.json({ error })
    }
}
