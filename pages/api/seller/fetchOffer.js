import connectMongo from "../../../utils/connectMongo";
import Product from "../../../model/Seller/Products";
import Seller from "../../../model/Seller/Seller";





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
        let name = req.query.id

        //using pagination 

        const ITEMS_PER_PAGE = 10;

        const page = req.query.page || 1


        const gen = await Product.find({ owner: name })
        //to skip items 
        const skip = (page - 1) * ITEMS_PER_PAGE

        //put all query params here
        const query = {}


        const offerPromise = Product.find({ owner: name }).limit(ITEMS_PER_PAGE).skip(skip)


        const countPromise = gen.length

        const [count, offers] = await Promise.all([countPromise, offerPromise])
        const pageCount = count / ITEMS_PER_PAGE;

        return res.status(200).json(
            {
                pagination: {
                    count,
                    pageCount
                },
                offers
            }
        )



    }
    catch (error) {

        console.log(error);
        res.json({ error })
    }


}