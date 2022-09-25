import connectMongo from "../../../utils/connectMongo"
import Admin from "../../../model/Admin/AdminModel"







export default async function fetchAdmin(req, res) {


    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { _id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');


        const admin = await Admin.findById(_id)

        console.log("Fetched admin")

        return res.status(200).json({
            ...admin._doc
        })

    } else {

        return res.status(400).json({
            notFound: true,
        });

    }

}