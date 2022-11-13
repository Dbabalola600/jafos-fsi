import connectMongo from "../../../../utils/connectMongo";
import OrderItem from "../../../../model/Student/orderItem";
import Order from "../../../../model/Student/order";
import Seller from "../../../../model/Seller/Seller"

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */





export default async function newOrderItem(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { user, orders } = JSON.parse(req.body)




        console.log(orders[0].storename)



        let massSName = []


        for (let i = 0; i < orders.length; i++) {
            massSName.push(orders[i].storename)
        }

        console.log(...massSName)

        const ordNum = await Order.find()
        let orNum = 0

        orNum = ordNum.length +1


        // console.log(orNum)

        const item = await Promise.all((
            orders.map(async (cart) => {
                return await OrderItem.create({
                    product: cart.product,
                    user: user,
                    orderNum: orNum,
                    storename: cart.storename,
                    price: cart.price,
                    quantity: cart.quantity,
                    amount: cart.amount,
                    status: cart.status,
                    p_status: cart.p_status,
                    mod: cart.mod
                })
            })))

        // console.log([...item]);

        // console.log(item[0]._id)

        const massID = []

        for(let i = 0; i<item.length; i++){
            massID.push(item[i]._id)
        } 

        // console.log(...massID)
        const order = await Order.create({
            orderNum: orNum,
            stores: [...massSName],
            user: user,
            orderList: [...massID],
        });

        console.log("ORDER ITEM ADDED ")

        res.json({ orders })
        // res.json({message: "yuppp"})
    } else {

        return res.status(400).json({
            notFound: true,
        });

    }
}