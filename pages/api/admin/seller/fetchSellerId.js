import connectMongo from "../../../../utils/connectMongo";
import Seller from "../../../../model/Seller/Seller"





/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */





export default async function fetchSellerId(req, res) {

    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { _id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');


        // const token = getCookies( { req, res, path:'/', domain:'localhost' })
        // console.log(token)

        const seller = await Seller.findById(_id).select("storename firstname ");

        console.log('FETCHED SELLER');
        //   console.log(seller)
        return res.status(200).json(
            seller

        )
    } else {

        return res.status(400).json({
            notFound: true,
        });

    }




}