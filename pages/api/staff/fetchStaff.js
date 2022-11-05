import connectMongo from "../../../utils/connectMongo";

import Staff from "../../../model/Staff/StaffModel";


export default async function fetchStaff(req,res){
    if (req.method==="POST"){
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { _id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');



        const staff = await Staff.findById(_id)

        console.log("FETCHED STAFF")
        return res.status(200).json({
            ...staff._doc
        })
    }
    else {

        return res.status(400).json({
            notFound: true,
        });

    }
};