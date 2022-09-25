import connectMongo from "../../../../utils/connectMongo";
import Seller from "../../../../model/Seller/Seller"





/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */




export default async function fetchSellerName(req, res) {



    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { store } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');

        const seller = await Seller.find({ storename: store })

        console.log("FETCHED STORE")


        return res.status(200).json({
            seller
        })

    } else {

        return res.status(400).json({
            notFound: true,
        });

    }
}