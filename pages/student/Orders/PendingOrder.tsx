import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import StuLayout from "../Layout/StuLayout";
import OrderCard2 from "../../../components/shared/OrderCard2";
import OrderCardUser from "../../../components/shared/OrderCardUser";
import OrderCardUser2 from "../../../components/shared/OrderCardUser2";
import OrderNav from "../../../components/shared/OrderNav";
import EmptyOrder from "../../../components/shared/Empty States/EmptyOrder";



type Order = {
    "0": {
        _id: string;


        orderNum: number
        user: string
        price: number;
        quantity: number;
        amount: number;
        status: string
        orderList: string

    }
}


type OrderItems = {
    _id: string;
    storename: string
    product: string
    orderNum: number
    user: string
    price: number;
    quantity: number;
    amount: number;
    status: string
    p_status: string;
}



type OrderAmt = {
    all: number
    cance: number
    del: number
    comp: number
    pend: number

}



export default function PendingOrder() {

    const [orders, setOrders] = useState<Order[]>([])
    const router = useRouter()
    const [Amt, setAmt] = useState<OrderAmt | null>(null)

    const showOrder = async () => {
        const token = getCookie("Normuser")
        const body = {
            name: token
        }








        const response = await fetch("/api/student/order/fetchPendingOrder", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Order[]


        setOrders(response)
        console.log(response)


        const body3 = {
            name: token
        }

        //fetch the amount of the orders 


        const Amtresponse = await fetch("/api/student/order/fetchOrderAmt", { method: "POST", body: JSON.stringify(body3) })
            .then(res => res.json()) as OrderAmt

        setAmt(Amtresponse)




    }
    useEffect(() => {
        showOrder()
    }, [])


    if (orders[0] === undefined) {
        return (
            <StuLayout>
                <>
                    <Header
                        title="Pending Orders"

                    />



                    <OrderNav
                        all={Amt?.all}
                        allLink="/student/Orders/"
                        canc={Amt?.cance}
                        cancLink="/student/Orders/CancelledOrder"
                        comp={Amt?.comp}
                        compLink="/student/Orders/CompletedOrder"
                        del={Amt?.del}
                        delLink="/student/Orders/DeliveredOrder"
                        pend={Amt?.pend}
                        pendLink="/student/Orders/PendingOrder"
                    />



                    <EmptyOrder />

                </>
            </StuLayout>
        )
    } else {
        return (
            <StuLayout>
                <>
                    <Header
                        title="Pending Orders"

                    />



                    <OrderNav
                        all={Amt?.all}
                        allLink="/student/Orders/"
                        canc={Amt?.cance}
                        cancLink="/student/Orders/CancelledOrder"
                        comp={Amt?.comp}
                        compLink="/student/Orders/CompletedOrder"
                        del={Amt?.del}
                        delLink="/student/Orders/DeliveredOrder"
                        pend={Amt?.pend}
                        pendLink="/student/Orders/PendingOrder"
                    />




                    <div className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6">


                        {orders.map((order: {
                            "0": {
                                _id: string;
                                orderNum: number
                                user: string
                                price: number;
                                quantity: number;
                                amount: number;
                                status: string;
                                orderList: string

                            }
                        }) => (
                            <div
                                key={order[0]._id}
                            >

                                {/* <OrderCard
                            OrderNum={order.oriOrder.orderNum}
                            status={order.orderObj.status}
                            ulink={`Orders/Details/${order.oriOrder._id}`}
                        /> */}

                                <OrderCardUser
                                    OrderNum={order[0].orderNum}

                                    status="Pending"
                                    ulink={`/student/Orders/Details/${order[0]._id}`}


                                />

                            </div>
                        ))}
                    </div>

                </>
            </StuLayout>
        )
    }






}




















{/* {orders.map((order: {
                    _id: string | null
                    user: string
                    product: string
                    storename: string
                    price: number
                    quantity: number
                    amount: number
                    status: string
                }) =>
                    <div
                        key={order._id}
                    >


                        <div
                            className="text-red-500"
                        >
                            {order.status}  {"  "}  {order.quantity} {"  "}  {order.product}
                        </div>





                    </div>
                )} */}
