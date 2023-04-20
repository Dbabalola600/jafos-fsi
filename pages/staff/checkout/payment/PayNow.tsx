import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../../components/shared/ErrMess";
import GoodMess from "../../../../components/shared/GoodMess";
import Header from "../../../../components/shared/Header";
import NavButton from "../../../../components/shared/NavButton";
import StaffLay from "../../Layout/StaffLay";
import CheckOutInfo from "../../../../components/shared/CheckOutInfo";
import CheckOutInfoPay from "../../../../components/shared/CheckOutInfoPay";








type Staff = {
    _id: string;
    firstname: string
    lastname: string
    staffid: string
    account_bal: number
}



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



export default function PayPortal() {
    const [staff, setStaff] = useState<Staff | null>(null);
    const [orders, setOrders] = useState<Orders[]>([])
    const [total, setTotal] = useState<number | null>()
    const [devfee, setDevfee] = useState<DevFee | null>()
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    const [showtoast, settoast] = useState({ message: "", show: false })
    const [showtoast2, settoast2] = useState({ message: "", show: false })
    const [showtoast3, settoast3] = useState({ message: "", show: false })
    const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })
    const [showtoastp, settoastp] = useState({ message: "", show: false })


    useEffect(() => {
        if (showtoast.show) {
            setTimeout(() => {
                settoast({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])

    useEffect(() => {
        if (showtoastp.show) {
            setTimeout(() => {
                settoastp({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])

    useEffect(() => {
        if (showgoodtoast.show) {
            setTimeout(() => {
                setgoodtoast({ message: "", show: false })
            }, 5000)
        }

    }, [showgoodtoast.show])


    useEffect(() => {
        if (showtoast3.show) {
            setTimeout(() => {
                settoast3({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast.show])

    useEffect(() => {
        if (showtoast2.show) {
            setTimeout(() => {
                settoast2({ message: "", show: false })
            }, 5000)
        }

    }, [showtoast2.show])

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





        // fetch dev fee amouunt 

        const feeResponse = await fetch("/api/staff/order/devFeeAmt", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as DevFee
        setDevfee(feeResponse)


        let l_tot = response.length.valueOf()
        let sum = 0






        for (let i = 0; i < l_tot; i++) {
            sum += response[i].amount
            console.log(sum)
            setTotal(sum)

        }



        const response2 = await fetch("/api/staff/fetchStaff", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Staff


        setStaff(response2)


    }
    useEffect(() => {
        showOrder()
    }, [])


    //orderid
    const massId: string[] = []

    for (let i = 0; i < orders.length; i++) {
        massId.push(orders[i]._id)
    }

    // console.log(massId)


    //store name
    const massStore: string[] = []

    for (let i = 0; i < orders.length; i++) {
        massStore.push(orders[i].storename)
    }

    // console.log(massStore)




    //payment api

    const Pay2 = async (amount: any, _id: string) => {

        setLoading(true)




        const token = getCookie("Staffuser")
        const body = {
            sen: token,
            amt: amount,
            or_id: _id,
            devf: devfee,
            tot: total


        }



        const reponse = await fetch("/api/staff/transactions/checkPay", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status === 200) {
                    setgoodtoast({ message: " message", show: true })
                    router.push("/staff/checkout/confirmOrder")
                } if (res.status === 256) {
                    settoast({ message: " message", show: true })
                }
                if (res.status === 245) {
                    settoast2({ message: " message", show: true })
                }
                if (res.status === 259) {
                    settoastp({ message: " message", show: true })
                    router.push("/staff/checkout/confirmOrder")
                }
                else {
                    settoast3({ message: " message", show: true })
                }
            }).catch(err => {
                console.log(err)
            })



        setLoading(false)


    }



    const Pay3 = async (_id: any) => {
        setLoading(true)

        const token = getCookie("Staffuser")

        const body2 = {
            sen: token,
            or_id: _id
        }



        const reponse = await fetch("/api/staff/transactions/checkPay2", { method: "POST", body: JSON.stringify(body2) })
            .then(async res => {
                if (res.status === 200) {

                    setgoodtoast({ message: " message", show: true })

                    // router.push("/staff/checkout/confirmOrder")
                    router.reload()

                } if (res.status == 256) {
                    settoast({ message: " message", show: true })
                }
                if (res.status == 245) {
                    settoast2({ message: " message", show: true })
                }
                if (res.status == 259) {
                    settoastp({ message: " message", show: true })

                    router.push("/staff/checkout/confirmOrder")
                }
                else {
                    settoast3({ message: " message", show: true })
                }
            }).catch(err => {
                console.log(err)
            })





        setLoading(false)

    }



    //delete one item 
    const delOne = async (id: any) => {
        const body = {
            id: id
        }
        const reponse = await fetch("/api/staff/order/deleteFromCheck", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {

                    router.reload()
                    console.log("DELETED")
                }
            })
    }

    return (
        <StaffLay>
            <>

                <Header
                    title="Pay Now "
                />
                <div
                    className="pt-5 text-black text-xl "
                >

                    <div>
                        Amount Due: NGN {total}
                    </div>
                    <div>
                        Available Balance: NGN {staff?.account_bal}
                    </div>
                    <div>
                        Delivery Fee: NGN {devfee?.fee}
                    </div>

                    <div>
                        Current Method of Delivery:  {orders[0]?.mod}
                    </div>

                </div>



                <div
                    className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6"

                >
                    {orders.map((order: {
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
                    }) =>
                        <div
                            key={order._id}
                        >





                            {/* <CheckOutInfo
                                amount={order.amount}
                                product={order.product}
                                quantity={order.quantity}
                                clickButton={() => delOne(order._id)}

                            /> */}
                            <CheckOutInfoPay
                                amount={order.amount}
                                product={order.product}
                                quantity={order.quantity}
                                status={order.p_status}
                                DelclickButton={() => delOne(order._id)}
                                PayclickButton={() => Pay3(order._id)}
                            />







                        </div>
                    )}

                </div>




                {/* <button className="w-full btn-primary btn mt-5 "
                    onClick={() => {
                        orders.map((order: any) => {
                            Pay2(order.amount, order._id)
                        }
                        )
                    }}>
                    {isLoading ? "Loading..." : "Pay"}

                </button> */}


                <button className="w-full btn-primary btn mt-5 "
                    onClick={() => router.push("/staff/checkout/confirmOrder")}>
                    {isLoading ? "Loading..." : "Confirm Order"}

                </button>


                {showtoast.show && <ErrMess title="insufficient funds" />}
                {showtoast2.show && <ErrMess title="invalid pin" />}
                {showtoast3.show && <ErrMess title="something went wrong please try again later" />}

                {showgoodtoast.show && <GoodMess title="payment successful" />}
                {showtoastp.show && <ErrMess title="Payment Already Made" />}













            </>
        </StaffLay>
    )
}