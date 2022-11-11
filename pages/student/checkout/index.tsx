import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GoodMess from "../../../components/shared/GoodMess";
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






export default function checkout() {

    const [orders, setOrders] = useState<Orders[]>([])
    const [total, setTotal] = useState<number | null>()
    const router = useRouter()



    const [isLoading, setLoading] = useState(false)
    const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })



    useEffect(() => {
        if (showgoodtoast.show) {
            setTimeout(() => {
                setgoodtoast({ message: "", show: false })
            }, 5000)
        }

    }, [showgoodtoast.show])


    const showOrder = async () => {
        const token = getCookie("Normuser")
        const body = {
            _id: token
        }


        /// fetches checkout items 

        const response = await fetch("/api/student/order/fetchCheckout", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Orders[]


        setOrders(response)
        console.log(response)


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




    //delete one item 
    const delOne = async (id: any) => {


        const body = {
            id: id
        }
        
        const reponse = await fetch("/api/student/order/deleteFromCheck", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    setgoodtoast({ message: " message", show: true })

                    router.reload()
                    console.log("DELETED")
                }
            })
    }




    return (
        <StuLayout>
            <>


                <Header
                    title="Checkout"
                />
                {showgoodtoast.show && <GoodMess title="Deleted Sucessfully" />}

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
                                Paymneent Status:  {order.p_status} {" "}  ,Method of Delivery:{order.mod} {""} price: {order.amount}
                            </p>
                        </div>

                        <button className="w-full btn-primary btn "
                            onClick={() => delOne(order._id)}
                        >
                            Delete Item

                        </button>




                    </div>
                )}




                <div
                    className="text-slate-800 mt-5 mb-5"
                >
                    Total {total}
                </div>



                <NavButton
                    title=" Proceed"
                    uLink="/student/checkout/deliveryMethod"
                />


            </>
        </StuLayout>
    )
}