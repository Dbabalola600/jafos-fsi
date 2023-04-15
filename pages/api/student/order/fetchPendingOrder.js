import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../model/Student/order";
import OrderItem from "../../../../model/Student/orderItem";







export default async function fetchPendingOrder(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { name } = JSON.parse(req.body)



        const item = await OrderItem.find({ user: name, status: "Pending" }).sort({ createdAt: -1 })


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



        // new tesing 

        // const orders = await Order.find({ user: name }).sort({ createdAt: -1 })
        // console.log("FETCHED ORDERS")



        // const NewStruct = await Promise.all(orders.map(async (oriOrder) => {
        //     const items = (await OrderItem.findById(oriOrder.orderList).find({ user: name }))
        //     return {
        //         oriOrder,
        //         orderObj: { ...items }
        //     }
        // }))



        return res.json(orderStruct)
        // return res.json(item)




    } else {
        return res.status(401).json({
            message: "wrong request"
        })
    }
}


