import { getCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Header from "../../../components/shared/Header"
import StaffLay from "../Layout/StaffLay"
import OrderNav from "../../../components/shared/OrderNav"
import OrderCardUser2 from "../../../components/shared/OrderCardUser2"











type Orders = {
    _id: string
    user: string
    product: string
    storename: string
    price: number
    quantity: number
    amount: number
    status: string
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



type SpecOrder = {
    _id: string;
    user: string;
    stores: string
    orderList: OrderItems
    orderNum: number

}


type OrderAmt = {
    all: number
    cance: number
    del: number
    comp: number
    pend: number

}

export default function Index() {

    const [orders, setOrders] = useState<OrderItems[]>([])
    const router = useRouter()
    const [Amt, setAmt] = useState<OrderAmt | null>(null)




    const showOrder = async () => {
        const token = getCookie("Staffuser")
        const body = {
            _id: token
        }


        const response = await fetch("/api/staff/order/fetchOrder", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as OrderItems[]


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
                    title="Orders"
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
                    }) => (
                        <div
                            key={order._id}
                        >


                            <OrderCardUser2
                                OrderNum={order.orderNum}
                                store={order.storename}
                                ulink={`Orders/Details/${order._id}`}




                            />
                           

                        </div>
                    ))}
                </div>



            </>
        </StaffLay>
    )



}

