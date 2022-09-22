import connectMongo from "../../../utils/connectMongo";
import Order from "../../../model/Student/order";







export default async function fetchOrder(req,res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const tools = await Order.find()

        console.log(...tools)
        return res.json(...tools)

    } catch (error) {
        console.log(error)
        res.json({ error });
    }
}
