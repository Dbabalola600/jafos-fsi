import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import StuLayout from "../Layout/StuLayout";
import OrderCard2 from "../../../components/shared/OrderCard2";


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



type SpecOrder = {
    _id: string;
    user: string;
    stores: string
    orderList: OrderItems
    orderNum: number

}



export default function Index() {

    const [orders, setOrders] = useState<SpecOrder[]>([])
    const router = useRouter()

    const showOrder = async () => {
        const token = getCookie("Normuser")
        const body = {
            stu: token
        }








        const response = await fetch("/api/student/order/fetchSpecOrder", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as SpecOrder[]


        setOrders(response)
        console.log(response)






    }
    useEffect(() => {
        showOrder()
    }, [])


    return (
        <StuLayout>
            <>
                <Header
                    title="Orders"
                    desc="Show recent orders i.e pending and what not"
                />


                <div>
                    click to show all orders i.e from the orders api
                </div>





                <div className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6">


                {orders.map((order: {
                    _id: string;
                    user: string
                    stores: string
                    orderNum: number
                }) => (
                    <div
                        key={order._id}
                    >

                        <OrderCard2
                            OrderNum={order.orderNum}
                            status={"pend"}
                            ulink={`Orders/Details/${order._id}`}
                        />

                        {/* <Link
                            href={`Orders/Details/${order._id}`}
                        >
                            <a>
                                <Header
                                    title="order"
                                    desc={order.orderNum}
                                />
                            </a>

                        </Link> */}

                    </div>
                ))}
                </div>

            </>
        </StuLayout>
    )



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
