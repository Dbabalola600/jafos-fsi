import connectMongo from "../../../../utils/connectMongo";
import Creder from "../../../../model/Creder/Creder";






export default async function fetchCreder(req,res){
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('FETCHING CREDERS');
        // const tests = await Test.findById({_id: req.body._id});

        const creders = await Creder.find()
        console.log('FETCHED CREDERS');

        res.status(200).json(creders)

        return

    } catch (error) {
        console.log(error);
       res.json({error})
    }
}
