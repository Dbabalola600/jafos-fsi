import connectMongo from "../../../../utils/connectMongo";
import Seller from "../../../../model/Seller/Seller"





/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */






export default async function fetchSeller(req,res){

    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('FETCHING Sellers');
        // const tests = await Test.findById({_id: req.body._id});

        const sellers = await Seller.find()
        console.log('FETCHED Sellers');

        res.status(200).json(sellers)

        return

    } catch (error) {
        console.log(error);
       res.json({error})
    }

  
} 