import CatLayout from "../Layout/CatLayout";
import Header from "../../../components/shared/Header";
import CusCollapse from "../../../components/shared/CusCollapse";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import OrderCard from "../../../components/shared/OrderCard";
import OrderCard2 from "../../../components/shared/OrderCard2";
import OrderNav from "../../../components/shared/OrderNav";





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




        const specOrder = await fetch("/api/seller/order/fetchDeliveredOrder", { method: "POST", body: JSON.stringify(body3) })
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



    return (
        <CatLayout>
            <>
                <Header
                    title="Completed Orders"
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


                    }, index) => (
                        <div
                            key={order[0]._id}
                        >

                            <div className="grid mt-10 ">
                                <OrderCard2
                                    OrderNum={order[0].orderNum}

                                    status={"Delivered"}
                                    ulink={`/seller/Orders/Details/${order[0]._id}`}



                                />



                            </div>

                        </div>
                    ))}
                </div>


                {/* {orderItems.map((orderItem: {
                    _doc: any;
                    _id: string;
                    storename: string
                    product: string
                    user: string
                    price: number;
                    quantity: number;
                    amount: number;
                    userObj: {
                        firstname: string
                        _id: string
                        lastname: string
                        matricno: string
                    }
                }) => (
                    <div
                        key={orderItem._id}
                    >
                        <CusCollapse
                            title={orderItem._doc.product}
                            info={orderItem?.userObj?.firstname}
                            clickButton={() => router.push(`/seller/Orders/Details/${orderItem._doc._id}`)}
                        />
                    </div>
                ))} */}


            </>
        </CatLayout>
    )
}

export default Orders;