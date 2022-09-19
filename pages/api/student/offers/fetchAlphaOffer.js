import Seller from "../../../../model/Seller/Seller";
import Product from "../../../../model/Seller/Products";
import connectMongo from "../../../../utils/connectMongo";



/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */



export default async function fetchAlpahOffer(req,res){
    try{
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('FETCHING DOCUMENTS');

        const seller_id = await Seller.find({ storename: 'Alpha' }).select("_id storename");

        console.log(seller_id);

        const offer = await Product.find({ owner: seller_id }).select("title price description category _id")
        console.log(...offer)
        return res.json(offer)

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            notFound: true,
        });
    }
}



