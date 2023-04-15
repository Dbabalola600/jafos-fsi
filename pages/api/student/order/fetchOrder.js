import connectMongo from "../../../../utils/connectMongo";
import OrderItem from "../../../../model/Student/orderItem";
import Order from "../../../../model/Student/order";






export default async function fetchOrder(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { _id } = JSON.parse(req.body)

        console.log('FETCHING Orders');

        const orders = await Order.find({ user: _id }).sort({createdAt: -1})
        console.log("FETCHED ORDERS")

        return res.status(200).json(
            orders
        )



    } else {

        return res.status(400).json({
            notFound: true,
        });

    }
}

