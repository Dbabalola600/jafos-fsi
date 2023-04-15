import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../model/Student/order";
import OrderItem from "../../../../model/Student/orderItem";
import Student from "../../../../model/Student/StudentModel";
import Staff from "../../../../model/Staff/StaffModel";


export default async function fetchOrderAmt(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { Sname } = JSON.parse(req.body)



        const cancelled = await OrderItem.find({ storename: Sname, status: "Cancelled" }).sort({ createdAt: -1 })
        const pending = await OrderItem.find({ storename: Sname, status: "Pending" }).sort({ createdAt: -1 })
        const delivered = await OrderItem.find({ storename: Sname, status: "Delivered" }).sort({ createdAt: -1 })
        const completed = await OrderItem.find({ storename: Sname, status: "Completed" }).sort({ createdAt: -1 })
        const allOr = await OrderItem.find({ storename: Sname })

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








// let list_order = []

        // for (let i = 0; i < orders.length; i++)(
        //     list_order.push(orders[i].orderList)
        // )


        // let list_Id = []

        // for (let i = 0; i < list_order.length; i++) {
        //     list_Id.push(...list_order[i])
        //     for (let j = 0; j < list_order[i].lenght; j++) {
        //         list_Id.push(list_order[i][j])
        //     }
        // }

        // console.log(list_Id)



