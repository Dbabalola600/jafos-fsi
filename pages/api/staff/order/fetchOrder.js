import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../model/Staff/order";




export default async function fetchOrder(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { _id } = JSON.parse(req.body)

        const orders = await Order.find({ user: _id }).sort({ createdAt: -1 })

        return res.status(200).json(orders)

    } else {

        return res.status(400).json({
            notFound: true,
        });

    }
}
