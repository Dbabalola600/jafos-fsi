import connectMongo from "../../../../utils/connectMongo";
import Product from "../../../../model/Seller/Products";
import Seller from "../../../../model/Seller/Seller";



/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */






export default async function filterOffers(req, res) {

    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { name } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');

        const seller_id = await Seller.find({ storename: name }).select("_id storename");

        console.log(seller_id)


        const { typee } = JSON.parse(req.body)

        const offer = await Product.find({ owner: seller_id, category: typee }).select("title price description category _id")
        console.log(...offer)
        return res.json(offer)

    } else {

        return res.status(400).json({
            notFound: true,
        });

    }

}


