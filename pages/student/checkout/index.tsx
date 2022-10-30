import { getCookie } from "cookies-next";
import Link from "next/link";
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






export default function checkout() {

    const [orders, setOrders] = useState<Orders[]>([])
    const [total, setTotal] = useState<number | null>()
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


        let tot = response[0].amount + response[1].amount
       

        let l_tot = response.length.valueOf()
        let sum = 0
        for (let i = 0; i < l_tot; i++) {
          
            sum += response[i].amount

            console.log(sum)
            setTotal(sum)
        }


    }
    useEffect(() => {
        showOrder()
    }, [])







    return (
        <StuLayout>
            <>


                <Header
                    title="Checkout"
                />

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




                <div
                className="text-slate-800"
                >
                    Total {total}
                </div>
            </>
        </StuLayout>
    )
}