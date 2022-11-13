

import Order from "../../../../model/Student/order";
import connectMongo from "../../../../utils/connectMongo";
import OrderItem from "../../../../model/Student/orderItem";
import Student from "../../../../model/Student/StudentModel"

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */






export default async function fetchOrderItem(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)
        console.log("FETCHING DOCUMENTS")


        const orders = await Order.findById(id)
        console.log("FETCHED ORDERS")


        // console.log(orders[0].stores)
        return res.status(200).json(

             orders
        )



    } else {
        return res.status(400).json({
            notFound: true,
        });
    }
}








