import connectMongo from "../../../../utils/connectMongo";
import OrderItem from "../../../../model/Staff/orderItem";





export default async function fetchOrderAmt(req, res) {

    if (req.method === "POST") {
        console.log("connecting")
        await connectMongo();

        console.log("connected")



        const { name } = JSON.parse(req.body)

        const cancelled = await OrderItem.find({ user: name, status: "Cancelled" }).sort({ createdAt: -1 })
        const pending = await OrderItem.find({ user: name, status: "Pending" }).sort({ createdAt: -1 })
        const delivered = await OrderItem.find({ user: name, status: "Delivered" }).sort({ createdAt: -1 })
        const completed = await OrderItem.find({ user: name, status: "Completed" }).sort({ createdAt: -1 })
        const allOr = await OrderItem.find({ user: name })




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





    } else {
        return res.status(401).json({
            message: "wrong request"
        })
    }



}