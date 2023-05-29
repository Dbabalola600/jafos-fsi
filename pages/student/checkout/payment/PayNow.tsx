import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../../components/shared/ErrMess";
import GoodMess from "../../../../components/shared/GoodMess";
import Header from "../../../../components/shared/Header";
import NavButton from "../../../../components/shared/NavButton";
import TextInput from "../../../../components/shared/TextInput";
import StuLayout from "../../Layout/StuLayout";
import CheckOutInfo from "../../../../components/shared/CheckOutInfo";
import CheckOutInfoPay from "../../../../components/shared/CheckOutInfoPay";
import Money_Format from "../../../../components/shared/money_format";

type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
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
    const [student, setStudent] = useState<Student | null>(null);
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
        const token = getCookie("Normuser")
        const body = {
            _id: token
        }


        /// fetches checkout items 

        const response = await fetch("/api/student/order/fetchCheckout", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Orders[]


        setOrders(response)




        // fetch dev fee amouunt 

        const feeResponse = await fetch("/api/student/order/devfeeAmt", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as DevFee
        setDevfee(feeResponse)


        let l_tot = response.length.valueOf()
        let sum = 0






        for (let i = 0; i < l_tot; i++) {
            sum += response[i].amount
            console.log(sum)
            setTotal(sum)

        }





        const response2 = await fetch("/api/student/fetchStudent", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Student


        setStudent(response2)


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

    console.log("this" + total)



    const Pay2 = async () => {

        setLoading(true)




        const token = getCookie("Normuser")



        const body2 = {
            sen: token
        }



        const reponse = await fetch("/api/student/transactions/checkPay", { method: "POST", body: JSON.stringify(body2) })
            .then(async res => {
                if (res.status === 200) {

                    setgoodtoast({ message: " message", show: true })

                    router.push("/student/checkout/payment/PayDelivery")
                

                } if (res.status == 256) {
                    settoast({ message: " message", show: true })
                }
                if (res.status == 245) {
                    settoast2({ message: " message", show: true })
                }
             
            }).catch(err => {
                console.log(err)
            })



        setLoading(false)


    }




    // const Pay3 = async (_id: any) => {
    //     setLoading(true)

    //     const token = getCookie("Normuser")

    //     const body2 = {
    //         sen: token,
    //         or_id: _id
    //     }



    //     const reponse = await fetch("/api/student/transactions/checkPay2", { method: "POST", body: JSON.stringify(body2) })
    //         .then(async res => {
    //             if (res.status === 200) {

    //                 setgoodtoast({ message: " message", show: true })

    //                 // router.push("/student/checkout/confirmOrder")
    //                 router.reload()

    //             } if (res.status == 256) {
    //                 settoast({ message: " message", show: true })
    //             }
    //             if (res.status == 245) {
    //                 settoast2({ message: " message", show: true })
    //             }
    //             if (res.status == 259) {
    //                 settoastp({ message: " message", show: true })

    //                 router.push("/student/checkout/confirmOrder")
    //             }
    //             else {
    //                 settoast3({ message: " message", show: true })
    //             }
    //         }).catch(err => {
    //             console.log(err)
    //         })





    //     setLoading(false)

    // }



    //delete one item 
    const delOne = async (id: any) => {


        const body = {
            id: id
        }
        const reponse = await fetch("/api/student/order/deleteFromCheck", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {

                    router.reload()
                    console.log("DELETED")
                }
            })
    }





    const delivery = async () => {

        const token = getCookie("Normuser")
        const body = {
            _id: token
        }

        const fee = await fetch("/api/student/transactions/deliveryFee", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.reload()
                } if (res.status == 256) {
                    settoast({ message: " message", show: true })
                }
            })
    }

    return (
        <StuLayout>
            <>

                <Header
                    title="Pay Now "
                />
                <div
                    className="text-red-500"
                >


                </div>



                <div
                    className="pt-5 text-black text-xl "
                >

                    <div>
                        Amount Due:   <Money_Format amount= {total}/>
                    </div>
                    <div>
                        Available Balance:    <Money_Format amount=  {student?.account_bal}/>
                    </div>
                    <div>
                        Delivery Fee:    <Money_Format amount=   {devfee?.fee}/>
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
                            <CheckOutInfo
                                amount={order.amount}
                                product={order.product}
                                quantity={order.quantity}
                                clickButton={() => delOne(order._id)}

                            />

                            {/* <CheckOutInfoPay
                                amount={order.amount}
                                product={order.product}
                                quantity={order.quantity}
                                status={order.p_status}
                                DelclickButton={() => delOne(order._id)}
                                PayclickButton={() => Pay3(order._id)}
                            /> */}



                        </div>
                    )}
                </div>






                {/* 
                <button className="w-full btn-primary btn mt-5 "
                    onClick={() => delivery()}>
                    {isLoading ? "Loading..." : "Pay for Delivery"}

                </button> */}

                <button className="w-full btn-primary btn mt-5 "
                    onClick={() => {Pay2()}}>
                    {isLoading ? "Loading..." : "Pay"}

                </button>

           



                {showtoast.show && <ErrMess title="insufficient funds" />}
               
            
                {showgoodtoast.show && <GoodMess title="payment successful" />}
             











            </>
        </StuLayout>
    )
}



