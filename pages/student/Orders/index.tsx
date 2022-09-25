import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import StuLayout from "../Layout/StuLayout";


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



export default function index() {

    const [orders, setOrders] = useState<Orders[]>([])
    const router = useRouter()

    const showOrder = async () => {
        const token = getCookie("Normuser")
        const body = {
            _id: token
        }




        const response = await fetch("/api/student/order/fetchOrder", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Orders[]


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



                {orders.map((order: {
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
                )}

            </>
        </StuLayout>
    )



}