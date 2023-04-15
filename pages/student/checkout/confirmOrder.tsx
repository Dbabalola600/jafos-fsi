import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import Header from "../../../components/shared/Header";
import NavButton from "../../../components/shared/NavButton";
import StuLayout from "../Layout/StuLayout";
import CheckOutConfirm from "../../../components/shared/CheckOutConfirm";



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






export default function ConfirmOrder() {

    const [orders, setOrders] = useState<Orders[]>([])
    const [total, setTotal] = useState<number | null>()
    const [isLoading, setLoading] = useState(false)

    const router = useRouter()



    const [devfee, setDevfee] = useState<number | null>()


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

        let dev = 50

        for (let i = 0; i < l_tot; i++) {


            if (response[i].mod === "PickUp") {
                dev = 0;
                setDevfee(dev)
            } else {
                dev = 50;
                setDevfee(dev)
            }


            sum += response[i].amount

            console.log(sum)
            setTotal(sum)
        }

        console.log(total)









    }
    useEffect(() => {
        showOrder()
    }, [])




    const addOrderItem = async () => {

        const user = getCookie("Normuser")

        setLoading(true)
        console.log(user)




        const body = {
            user: user,
            orders

        }



        const body2 = {
            sen: user,
            devf: devfee
        }

        const body3 = {
            user: user
        }

        const response = await fetch("/api/student/order/newOrderItem", { method: "Post", body: JSON.stringify(body) })
            .then(async res => {
                console.log(res.status)

                if (res.status == 200) {

                    // subtract delivery fee
                    const fee = await fetch("/api/student/transactions/deliveryFee", { method: "POST", body: JSON.stringify(body2) })
                        .then(async res => {
                            if (res.status === 200) {
                                //delete entire cart
                                const del = await fetch("/api/student/order/deleteCheck", { method: "POST", body: JSON.stringify(body3) })
                                    .then(res => {
                                        if (res.status == 200) {
                                            router.push("/student/Orders/")
                                            console.log("SUCCESS")
                                        }
                                    })
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

                <div
                    className="text-black text-xl"
                >

                    <div>
                        Amount Due: NGN {total}
                    </div>
                    <div>
                        Payment Status: {orders[0]?.p_status}
                    </div>
                    <div>
                        Method Of Delivery: {orders[0]?.mod}
                    </div>
                </div>



                <div
                    className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6"

                >
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



                            <CheckOutConfirm
                                amount={order.amount}
                                product={order.product}
                                quantity={order.quantity}
                            />






                        </div>
                    )}

                </div>





                <div
                    className="text-slate-800 mt-5 mb-5 text-xl font-bold"
                >
                    Total: NGN {total}
                </div>



                <button className="w-full btn-primary btn "
                    onClick={addOrderItem}


                >
                    {isLoading ? "Loading..." : "Confirm Order"}

                </button>


            </>
        </StuLayout>
    )
}