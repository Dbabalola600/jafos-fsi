import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../model/Staff/order";
import OrderItem from "../../../../model/Staff/orderItem";



export default async function fetchCompOrder(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { name } = JSON.parse(req.body)

        const item = await OrderItem.find({ user: name, status: "Completed" }).sort({ createdAt: -1 })


        let item_no_list = []

        for (let i = 0; i < item.length; i++) {
            item_no_list.push(item[i].orderNum)
        }

        const orderStruct = await Promise.all(item_no_list.map(async (nom) => {
            const l_order = Order.find({ orderNum: nom })
            return (
                l_order
            )
        }))


        return res.status(200).json(orderStruct)

        
    } else {
        return res.status(401).json({
            message: "wrong request"
        })
    }
}