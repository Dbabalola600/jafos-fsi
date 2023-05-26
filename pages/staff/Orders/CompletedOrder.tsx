import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import OrderCardUser from "../../../components/shared/OrderCardUser";
import OrderNav from "../../../components/shared/OrderNav";
import StaffLay from "../Layout/StaffLay";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";




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



type OrderAmt = {
    all: number
    cance: number
    del: number
    comp: number
    pend: number

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





export default function CompletedOrder() {

    const [orders, setOrders] = useState<Order[]>([])
    const router = useRouter()
    const [Amt, setAmt] = useState<OrderAmt | null>(null)

    const showOrder = async () => {
        const token = getCookie("Staffuser")
        const body = {
            name: token
        }


        const response = await fetch("/api/staff/order/fetchCompletedOrder", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Order[]


        setOrders(response)
        console.log(response)





        const body3 = {
            name: token
        }

        //fetch the amount of the orders 


        const Amtresponse = await fetch("/api/staff/order/fetchOrderAmt", { method: "POST", body: JSON.stringify(body3) })
            .then(res => res.json()) as OrderAmt
       
        setAmt(Amtresponse)


    }

    useEffect(() => {
        showOrder()
    }, [])



    return (
        <StaffLay>
            <>
                <Header
                    title="Completed Orders"
                />


                <OrderNav
                    all={Amt?.all}
                    allLink="/staff/Orders/"
                    canc={Amt?.cance}
                    cancLink="/staff/Orders/CancelledOrder"
                    comp={Amt?.comp}
                    compLink="/staff/Orders/CompletedOrder"
                    del={Amt?.del}
                    delLink="/staff/Orders/DeliveredOrder"
                    pend={Amt?.pend}
                    pendLink="/staff/Orders/PendingOrder"
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


                            <OrderCardUser
                                OrderNum={order[0].orderNum}

                                status="Completed"
                                ulink={`/staff/Orders/Details/${order[0]._id}`}


                            />

                        </div>
                    ))}
                </div>



            </>
        </StaffLay>
    )
}