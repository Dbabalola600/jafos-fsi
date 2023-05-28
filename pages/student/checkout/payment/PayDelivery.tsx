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
    _id: string
    fee: number
    n_store: any
}

export default function PayPortal() {
    const [student, setStudent] = useState<Student | null>(null);
    const [orders, setOrders] = useState<Orders[]>([])
    const [total, setTotal] = useState<number | null>()
    const [devfee, setDevfee] = useState<DevFee>()
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




    // console.log(massId)





    //payment api

    console.log("this" + total)
















    const delivery = async () => {

        const token = getCookie("Normuser")
        const body = {
            _id: token
        }

        const fee = await fetch("/api/student/transactions/deliveryFee", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/student/checkout/confirmOrder")
                } if (res.status == 256) {
                    settoast({ message: " message", show: true })
                }
            })
    }

    return (
        <StuLayout>
            <>

                <Header
                    title="Pay Delivery Fee "
                />




                <div
                    className="pt-5 text-black text-xl "
                >

                    <div>
                        Amount Due:   ₦  {total}
                    </div>
                    <div>
                        Available Balance:   ₦  {student?.account_bal}
                    </div>
                    <div>
                        Delivery Fee:   ₦  {devfee?.fee}
                    </div>

                    <div>
                        Current Method of Delivery:  {orders[0]?.mod}
                    </div>

                </div>









                {/* <div
                    className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6"

                >




                    {devfee?.n_store.map((store: any, index: any) => (
                        <div
                            key={index}
                        >
                            {store}

                        </div>
                    ))}

                </div> */}




                <button className="w-full btn-primary btn mt-5 "
                    onClick={delivery}


                >
                    {isLoading ? "Loading..." : "Pay for delivery"}

                </button>





                {/* <button className="w-full btn-primary btn mt-5 "
                    onClick={() => router.push("/student/checkout/confirmOrder")}>
                    {isLoading ? "Loading..." : "Confirm Order"}

                </button> */}



                {showtoast.show && <ErrMess title="insufficient funds" />}
                {showtoast2.show && <ErrMess title="invalid pin" />}
                {showtoast3.show && <ErrMess title="something went wrong please try again later" />}

                {showgoodtoast.show && <GoodMess title="payment successful" />}
                {showtoastp.show && <ErrMess title="Payment Already Made" />}












            </>
        </StuLayout>
    )
}




