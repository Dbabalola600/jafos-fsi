import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../model/Staff/order";
import OrderItem from "../../../../model/Staff/orderItem";









export default async function fetchOrder(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)

        console.log(id)


        const orders = await Order.findById(id)

        let MainOrder = []

        for (let i = 0; i < orders.orderList.length; i++) {

            MainOrder.push(orders.orderList[i])


        }

        // console.log(MainOrder[0])

        const newOrderStruct = await Promise.all(MainOrder.map(async(n_id)=>{
            const l_order= await OrderItem.findById(n_id)

            return(
               l_order
            ) 
        }))


        // console.log(newOrderStruct)


        return res.json(
            newOrderStruct
        )


    } else {
        return res.status(400).json({
            message: "WRONG REQUEST"
        })
    }
}
