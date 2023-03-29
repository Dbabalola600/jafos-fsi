import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../model/Student/order";
import OrderItem from "../../../../model/Student/orderItem";
import Student from "../../../../model/Student/StudentModel";
import Staff from "../../../../model/Staff/StaffModel";


export default async function fetchNewOrder(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { Sname } = JSON.parse(req.body)



        const orders = await Order.find({ stores: Sname }).sort({ createdAt: -1 })


        console.log(orders)

        const NewStruct = await Promise.all(orders.map(async (oriOrder) => {
            const item = await OrderItem.findById(oriOrder.orderList).find({ storename: Sname })
            const user = await Student.findById(oriOrder.user).select("firstname lastname matricno ")

            if (user === null) {
                const user = await Staff.findById(oriOrder.user).select("firstname lastname staffid")
                if (!user) {
                    return {
                        oriOrder,
                        userObj: null,
                        orderObj: { ...item }
                    };
                } return {
                    oriOrder,
                    userObj: user,
                    orderObj: { ...item }
                }

            } else {
                if (!user) {
                    return {
                        oriOrder,
                        userObj: null,
                        orderObj: { ...item }
                    }
                }
                return {
                    oriOrder,
                    userObj: user,
                    orderObj: { ...item }
                }
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



