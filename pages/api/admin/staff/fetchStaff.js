import connectMongo from "../../../../utils/connectMongo";
import Staff from "../../../../model/Staff/StaffModel";









export default async function fetchStaff(req,res){

    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('FETCHING STAFF');
        // const tests = await Test.findById({_id: req.body._id});

        const staff = await Staff.find()
        console.log('FETCHED STAFF');

        res.status(200).json(staff)

        return

    } catch (error) {
        console.log(error);
       res.json({error})
    }

  
} 