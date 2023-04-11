import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../model/Student/order";
import OrderItem from "../../../../model/Student/orderItem";
import Student from "../../../../model/Student/StudentModel";
import Staff from "../../../../model/Staff/StaffModel";


export default async function fetchPendingOrder(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { Sname } = JSON.parse(req.body)



        const item = await OrderItem.find({ storename: Sname, status: "Pending" }).sort({ createdAt: -1 })
        console.log(item.length)

        let item_no_list =[]

        for (let i = 0; i <item.length; i++){
            item_no_list.push(item[i].orderNum)
        }

        const orderStruct  = await Promise.all(item_no_list.map(async(nom)=>{
            const l_order = Order.find({ orderNum: nom })

            return(
                l_order
            )
        }))


        return res.json(orderStruct)
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



