import connectMongo from "../../../../utils/connectMongo";
import OrderItem from "../../../../model/Student/orderItem";



export default async function fetchOrderAmt(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const {  name } = JSON.parse(req.body)



        const cancelled = await OrderItem.find({ user: name, status: "Cancelled" }).sort({ createdAt: -1 })
        const pending = await OrderItem.find({ user: name, status: "Pending" }).sort({ createdAt: -1 })
        const delivered = await OrderItem.find({ user: name, status: "Delivered" }).sort({ createdAt: -1 })
        const completed = await OrderItem.find({ user: name, status: "Completed" }).sort({ createdAt: -1 })
        const allOr = await OrderItem.find({ user: name })

        console.log(allOr.length)

        let cance = cancelled.length
        let pend = pending.length
        let del = delivered.length
        let comp = completed.length
        let all = allOr.length

        return res.status(200).json({
            cance,
            pend,
            del,
            comp,
            all
        })
        // return res.json(orderStruct)




    } else {
        return res.status(401).json({
            message: "wrong request"
        })
    }
}

