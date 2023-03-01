import connectMongo from "../../../../utils/connectMongo";
import OrderItem from "../../../../model/Student/orderItem";
import Student from "../../../../model/Student/StudentModel"
import Order from "../../../../model/Student/order";

import Staff from "../../../../model/Staff/StaffModel"
// import Order from "../../../../model/Staff/order"
// import OrderItem from "../../../../model/Staff/orderItem";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

// 6378e8dede4ade10cbc5f5c0
// 6371574a618255ae79c2fa53 student

export default async function fetchOrder(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id, Sname } = JSON.parse(req.body)

        // console.log(Sname)


        const orders = await Order.findById(id)



        console.log(orders.orderList.length)


        let list_Id = []

        for (let i = 0; i < orders.orderList.length; i++) {
            list_Id.push(orders.orderList[i])
        }



        const newOrderStruct = await Promise.all(list_Id.map(async (n_id) => {
            const l_order = await OrderItem.findById(n_id)

            return (
                l_order
            )
        }))

        // console.log(newOrderStruct)

        let MainOrderStruct = []

        for (let i = 0; i < newOrderStruct.length; i++) {
            if (newOrderStruct[i].storename === Sname) {
                MainOrderStruct.push(newOrderStruct[i])
            }
        }




        const DetOrderStruct = await Promise.all(MainOrderStruct.map(async (oriOrder) => {
            const existingUser = await Student.findById(oriOrder.user).select("firstname lastname matricno ")

            // console.log(existingUser)

            if (existingUser === null) {
                const existingUser = await Staff.findById(oriOrder.user).select("firstname lastname staffid")
                if (!existingUser) {
                    return { ...oriOrder, userObj: null };
                }
                return ({
                    oriOrder,
                    userObj: existingUser
                });
               
            } else {
                if (!existingUser) {
                    return { ...oriOrder, userObj: null };
                }
                return ({
                    oriOrder,
                    userObj: existingUser
                });
            }






        }))
        // console.log(newOrderStruct)



        return res.json(
            DetOrderStruct
        )


    } else {
        return res.status(400).json({
            message: "WRONG REQUEST"
        })
    }
}










// export default async function fetchOrder(req, res) {
//     if (req.method === "POST") {
//         console.log('CONNECTING TO MONGO');
//         await connectMongo();
//         console.log('CONNECTED TO MONGO');

//         const { name } = JSON.parse(req.body)
//         console.log("FETCHING DOCUMENTS")


//         const orders = await OrderItem.find({ storename: name }).sort({createdAt: -1})


//         const newOrderStuct = await Promise.all(orders.map(async (oriOrder) => {
//             const existingUser = await Student.findById(oriOrder.user).select("firstname lastname matricno ")
//             // console.log(existingUser)

//             // console.log(existingUser)
//             if (!existingUser) {
//                 return { ...oriOrder, userObj: null };
//             }
//             return ({
//                 ...oriOrder,
//                 userObj: existingUser
//             });


//         }))



//         // console.log(newOrderStuct)
//         return res.json(

//              newOrderStuct
//         )



//     } else {
//         return res.status(400).json({
//             notFound: true,
//         });
//     }
// }
