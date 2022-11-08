import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
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
    p_status: string
    mod: string
}






export default function confirmOrder() {

    const [orders, setOrders] = useState<Orders[]>([])
    const [total, setTotal] = useState<number | null>()
    const [isLoading, setLoading] = useState(false)

    const router = useRouter()

    const showOrder = async () => {
        const token = getCookie("Normuser")
        const body = {
            _id: token
        }


        /// fetches checkout items 

        const response = await fetch("/api/student/order/fetchCheckout", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Orders[]


        setOrders(response)
        // console.log(response)


        // let tot = response[0].amount + response[1].amount


        let l_tot = response.length.valueOf()
        let sum = 0
        for (let i = 0; i < l_tot; i++) {

            sum += response[i].amount

            console.log(sum)
            setTotal(sum)
        }

        console.log(total)





    }
    useEffect(() => {
        showOrder()
    }, [])

    console.log(orders)





    const addOrderItem = async () => {
      
        const user = getCookie("Normuser")

        setLoading(true)
        console.log(user)

    


        const body = {
            user: user,
            orders

        }


        const response = await fetch("/api/student/order/newOrderItem", { method: "Post", body: JSON.stringify(body) })
            .then(async res => {
                console.log(res.status)

                if (res.status == 200) {

                    //delete entire cart
                    const del = await fetch("/api/student/order/deleteCheck", { method: "POST", body: JSON.stringify(user) })
                        .then(res => {
                            if (res.status == 200) {
                                router.push("/student/Orders/")
                                console.log("SUCCESS")
                            }
                        })
                }

             


                if (res.status == 401) {
                    console.log("ERROR")
                }
            })
            .catch(err => {
                console.log(err)
            })






        setLoading(false)
    }




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
                    p_status: string
                    mod: string
                }) =>
                    <div
                        key={order._id}
                    >


                        <div
                            className="text-red-500 mt-10"
                        >
                            Order Status: {order.status}  {"  "} ,Quantity:  {order.quantity} {"  "} ,Product name:  {order.product}
                            <p>
                                Paymneent Status:  {order.p_status} {" "}  ,Method of Delivery:{order.mod}
                            </p>
                        </div>





                    </div>
                )}




                <div
                    className="text-slate-800 mt-5 mb-5"
                >
                    Total {total}
                </div>



                <button className="w-full btn-primary btn "
                onClick={ addOrderItem}


                >
                    {isLoading ? "Loading..." : "Confirm Order"}
                   
                </button>


            </>
        </StuLayout>
    )
}