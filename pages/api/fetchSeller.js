import connectMongo from "../../utils/connectMongo";
import Seller from "../../model/Seller/Seller";





export default async function fetchSeller(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('FETCHING Sellers');
       
        const sellers = await Seller.find()
        console.log('FETCHED Sellers');

        res.status(200).json(sellers)

        return

    } catch (error) {
        console.log(error);
       res.json({error})
    }
};

