import connectMongo from "../../../../utils/connectMongo";
import OrderItem from "../../../../model/Student/orderItem";
import Order from "../../../../model/Student/order";


/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */





export default async function newOrderItem(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { user, cartList } = JSON.parse(req.body)

        const item = await Promise.all( (
            cartList.map( async (cart) => {
                return  await OrderItem.create({
                    product: cart.product,
                    user: user,
                    storename: cart.storename,
                    price: cart.price,
                    quantity: cart.quantity,
                    amount: cart.amount,
                    status: "Pending",
                    p_status: "Unpaid",
                    mod: "PickUp"
                })
            })))

            console.log([...item]);

        const order = await Order.create({
            user: user,
            orderList: [...item],
        });

        console.log("ORDER ITEM ADDED ")

        res.json({ order })
    } else {

        return res.status(400).json({
            notFound: true,
        });

    }
}