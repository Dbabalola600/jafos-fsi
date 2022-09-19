import Seller from "../../../model/Seller/Seller";
import Product from "../../../model/Seller/Products";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */



export default async function fetchOffer(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('FETCHING DOCUMENTS');

        //find the seller
        // const seller = await Seller.find({ storename: 'Delta' }).select("_id storename");




        // console.log(seller[0]["storename"])
        // return res.status(200).json({
        //     ...seller
        // })

        // finding the offers
        // const offer = await Product.find();

        // console.log(offer["1"]["owner"])
        // return res.status(200).json({
        //     ...offer
        // })

        const seller_id = await Seller.find({ storename: 'Gama' }).select("_id storename");

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