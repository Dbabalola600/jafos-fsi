import CatLayout from "../Layout/CatLayout";
import Header from "../../../components/shared/Header";
import CusCollapse from "../../../components/shared/CusCollapse";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import OrderCard from "../../../components/shared/OrderCard";
import OrderNav from "../../../components/shared/OrderNav";
import EmptyOrder from "../../../components/shared/Empty States/EmptyOrder";





type Seller = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}




type OrderItems = {
    _doc: any
    _id: string;
    product: string;
    storename: string;
    price: number;
    quantity: number;
    amount: number;
    user: string;
    userObj: {
        firstname: string
        lastname: string
        matricno: string
        _id: string
    }
}





type Order = {

    userObj: {
        firstname: string
        _id: string
        lastname: string
    }

    orderObj: {
        "0": {
            _id: string;
            storename: string
            product: string
            orderNum: number
            user: string
            price: number;
            quantity: number;
            amount: number;
            status: string
        }
    }

    oriOrder: {
        stores: string
        orderList: OrderItems
        orderNum: number
        user: string
        _id: string

    }
}

type OrderAmt = {
    all: number
    cance: number
    del: number
    comp: number
    pend: number

}

function Orders() {
    const router = useRouter()
    const [seller, setSeller] = useState<Seller | null>(null);

    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);

    const [orders, setOrders] = useState<Order[]>([])

    const [Amt, setAmt] = useState<OrderAmt | null>(null)




    const showinfo = async () => {

        const token = getCookie("Selluser")
        console.log(token)

        const body = {
            _id: token
        }

        const response = await fetch("/api/seller/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


        setSeller(response)

        console.log(response.storename)






        const body3 = {
            Sname: response.storename
        }




        const specOrder = await fetch("/api/seller/order/fetchNewOrder", { method: "POST", body: JSON.stringify(body3) })
            .then(res => res.json()) as Order[]


        console.log(specOrder)
        setOrders(specOrder)



        //fetch the amount of the orders 


        const Amtresponse = await fetch("/api/seller/order/fetchOrderAmt", { method: "POST", body: JSON.stringify(body3) })
            .then(res => res.json()) as OrderAmt

        setAmt(Amtresponse)

    }

    useEffect(() => {
        showinfo()
    }, []
    )


    if (orders[0]?.oriOrder._id === undefined) {

        return (
            <CatLayout>
                <>
                    <Header
                        title="All Orders"
                    />





                    <OrderNav
                        all={Amt?.all}
                        allLink="/seller/Orders/"
                        canc={Amt?.cance}
                        cancLink="/seller/Orders/CancelledOrder"
                        comp={Amt?.comp}
                        compLink="/seller/Orders/CompletedOrder"
                        del={Amt?.del}
                        delLink="/seller/Orders/DeliveredOrder"
                        pend={Amt?.pend}
                        pendLink="/seller/Orders/PendingOrder"

                    />


                    <EmptyOrder />





                </>
            </CatLayout>
        )
    } else {
        return (
            <CatLayout>
                <>
                    <Header
                        title="All Orders"
                    />





                    <OrderNav
                        all={Amt?.all}
                        allLink="/seller/Orders/"
                        canc={Amt?.cance}
                        cancLink="/seller/Orders/CancelledOrder"
                        comp={Amt?.comp}
                        compLink="/seller/Orders/CompletedOrder"
                        del={Amt?.del}
                        delLink="/seller/Orders/DeliveredOrder"
                        pend={Amt?.pend}
                        pendLink="/seller/Orders/PendingOrder"

                    />


                    <div className="grid grid-cols-2 lg:grid-cols-2  gap-6">


                        {orders.map((order: {
                            userObj: {
                                firstname: string
                                _id: string
                                lastname: string
                            }

                            orderObj: {
                                "0": {
                                    _id: string;
                                    storename: string
                                    product: string
                                    orderNum: number
                                    user: string
                                    price: number;
                                    quantity: number;
                                    amount: number;
                                    status: string
                                }
                            }

                            oriOrder: {
                                stores: string
                                orderList: OrderItems
                                orderNum: number
                                user: string
                                _id: string

                            }
                        }, index) => (
                            <div
                                key={order.oriOrder._id}
                            >

                                <div className="grid mt-5 ">
                                    <OrderCard
                                        OrderNum={order.oriOrder.orderNum}
                                        User={order.userObj.firstname + order.userObj.lastname}
                                        status={order.orderObj[0].status}
                                        ulink={`Orders/Details/${order.oriOrder._id}`}



                                    />



                                </div>

                            </div>
                        ))}
                    </div>





                </>
            </CatLayout>
        )
    }


}

export default Orders;