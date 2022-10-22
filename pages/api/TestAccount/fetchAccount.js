import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/TEST Account/Users";



export default async function fetchAccount(req,res){
    try{
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('FETCHING DOCUMENTS');


        const acc = await User.find()
        console.log("Fetched accounts")


        return res.status(200).json({
            acc
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            notFound: true,
        });
    }
}
