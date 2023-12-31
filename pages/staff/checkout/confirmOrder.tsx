import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Header from "../../../components/shared/Header"
import StaffLay from "../Layout/StaffLay"
import CheckOutConfirm from "../../../components/shared/CheckOutConfirm"
import ErrMess from "../../../components/shared/ErrMess"









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
type DevFee = {
    fee: number
    n_store: any
}





export default function ConfirmOrder() {

    const [orders, setOrders] = useState<Orders[]>([])
    const [total, setTotal] = useState<number | null>()
    const [isLoading, setLoading] = useState(false)
    const [showtoast, settoast] = useState({ message: "", show: false })
    const router = useRouter()



    const [devfee, setDevfee] = useState<DevFee | null>()


    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])


    const showOrder = async () => {
        const token = getCookie("Staffuser")
        const body = {
            _id: token
        }


        /// fetches checkout items 

        const response = await fetch("/api/staff/order/fetchCheckout", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Orders[]


        setOrders(response)
        // console.log(response)


        // let tot = response[0].amount + response[1].amount


        // fetch dev fee amouunt 

        const feeResponse = await fetch("/api/staff/order/devFeeAmt", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as DevFee
        setDevfee(feeResponse)


        console.log(feeResponse)

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




    const addOrderItem = async () => {

        const user = getCookie("Staffuser")

        setLoading(true)
        console.log(user)




        const body = {
            user: user,
            orders

        }



        const body2 = {
            _id: user
        }

        const body3 = {
            user: user
        }

        const response = await fetch("/api/staff/order/newOrderItem", { method: "Post", body: JSON.stringify(body) })
            .then(async res => {
                console.log(res.status)

                if (res.status == 200) {

                    // subtract delivery fee
                    const fee = await fetch("/api/staff/transactions/deliveryFee", { method: "POST", body: JSON.stringify(body2) })
                        .then(async res => {
                            if (res.status === 200) {
                                //delete entire cart
                                const del = await fetch("/api/staff/order/deleteCheck", { method: "POST", body: JSON.stringify(body3) })
                                    .then(res => {
                                        if (res.status == 200) {
                                            router.push("/staff/Orders/")
                                            console.log("SUCCESS")
                                        }
                                    })
                            } if (res.status == 256) {
                                settoast({ message: " message", show: true })
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
        <StaffLay>
            <>


                <Header
                    title="Confirm Order"
                />
                <div
                    className="text-black text-xl"
                >

                    <div>
                        Amount Due:   ₦  {total}
                    </div>
                    {/* <div>
                        Payment Status: {orders[0]?.p_status}
                    </div> */}
                    <div>
                        Method Of Delivery: {orders[0]?.mod}
                    </div>
                    <div>
                        Delivery Fee:   ₦  {devfee?.fee}
                    </div>
                </div>
                {showtoast.show && <ErrMess title="insufficient funds to pay for delivery" />}

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







                {/* <div
                    className="text-slate-800 mt-5 mb-5 text-xl font-bold"
                >
                    Total:   ₦  {total}
                </div> */}



                <button className="w-full btn-primary btn mt-5 "
                    onClick={addOrderItem}


                >
                    {isLoading ? "Loading..." : "Confirm Order"}

                </button>
                <div
                    className=" text-center text-sm mt-5"
                >
                    {/* NOTE:  confirming and order with a delivery fee will see the amount deducted from your account */}
                </div>


            </>
        </StaffLay>
    )
}