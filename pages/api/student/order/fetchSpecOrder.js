import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../model/Student/order";
import OrderItem from "../../../../model/Student/orderItem";




export default async function fetchSpecOrder(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { id } = JSON.parse(req.body)

        // const ord = await Order.find()

       

        const sepc = await Order.find({ orderList: id })
        console.log(sepc)

        const NewStruct = await Promise.all(sepc.map(async (oriOrder) => {
            const item = await OrderItem.findById(oriOrder.orderList)

            return {
                oriOrder,
                orderObj: item 
            }
        }))







        return res.status(200).json(

            NewStruct
        )

    } else {
        return res.status(401).json({
            message: "wrong request"
        })
    }
}




