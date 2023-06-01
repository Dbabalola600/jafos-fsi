import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import GoodMess from "../../../components/shared/GoodMess"
import Header from "../../../components/shared/Header"
import NavButton from "../../../components/shared/NavButton"
import StaffLay from "../Layout/StaffLay"
import CheckOutInfo from "../../../components/shared/CheckOutInfo"
import Money_Format from "../../../components/shared/money_format"
import EmptyCheckout from "../../../components/shared/Empty States/EmptyCheckOut"











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






export default function Checkout() {

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
        const token = getCookie("Staffuser")
        const body = {
            _id: token
        }


        /// fetches checkout items 

        const response = await fetch("/api/staff/order/fetchCheckout", { method: "POST", body: JSON.stringify(body) })
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

        const reponse = await fetch("/api/staff/order/deleteFromCheck", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    setgoodtoast({ message: " message", show: true })

                    router.reload()
                    console.log("DELETED")
                }
            })
    }


    if (orders[0] === undefined) {
        return (
            <StaffLay>
                <>


                    <Header
                        title="Checkout"
                    />
                    <EmptyCheckout />


                </>
            </StaffLay>
        )
    } else {
        return (
            <StaffLay>
                <>


                    <Header
                        title="Checkout"
                    />
                    {showgoodtoast.show && <GoodMess title="Deleted Sucessfully" />}


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



                                <CheckOutInfo
                                    amount={order.amount}
                                    product={order.product}
                                    quantity={order.quantity}
                                    clickButton={() => delOne(order._id)}

                                />



                            </div>
                        )}
                    </div>






                    <div
                        className="text-slate-800 mt-5 mb-5 text-xl font-bold"
                    >
                        Total:   <Money_Format amount={total} />
                    </div>



                    <NavButton
                        title="Select Method of Delivery"
                        uLink="/staff/checkout/deliveryMethod/"
                    />


                </>
            </StaffLay>
        )
    }


}