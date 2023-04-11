import connectMongo from "../../../utils/connectMongo";
import Staff from "../../../model/Staff/StaffModel";




export default async function FetchStaff(req,res){
    if (req.method === "POST"){

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { name } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');


        const staff = await Staff.find({staffid: name}).select("staffid")
        console.log("FETCHED DOCUMENTS")

        return res.status(200).json(...staff)

    }else{
        return res.status(400).json({
            notFound: true,
        });
    }
}


