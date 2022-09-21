import connectMongo from "../../../utils/connectMongo";
import Cart from "../../../model/Cart";





/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */





export default async function fetchCart(req, res) {

    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');
        const { id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');
        const CartItems = await Cart.find({ user: id }).select("title category price   ")
        console.log(...CartItems)

        return res.json(CartItems)
        consol.log("ITEMS GOTTEN")
    } else {

        return res.status(400).json({
            notFound: true,
        });

    }

}


