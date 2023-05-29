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


        // fetch dev fee amouunt 

        const feeResponse = await fetch("/api/student/order/devfeeAmt", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as DevFee
        setDevfee(feeResponse)


        let l_tot = response.length.valueOf()
        let sum = 0













        const response2 = await fetch("/api/student/fetchStudent", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Student


        setStudent(response2)





        for (let i = 0; i < l_tot; i++) {
            sum += response[i].amount
            console.log(sum)
            setTotal(sum)

        }



        // total && devfee && m_setTotal(total + devfee?.fee)


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

    // total && devfee?.fee && console.log(total + devfee?.fee)
    // total && devfee && m_setTotal(total + devfee?.fee)






    return (
        <StuLayout>
            <>

                <Header
                    title="Payment"
                />
                <div
                    className="text-black text-xl"
                >

                    <div>
                        Amount Due:    <Money_Format amount= {total}/>
                    </div>

                    <div>
                        Delivery Fee:    <Money_Format amount=  {devfee?.fee}/>
                    </div>


                    <div>
                        Available Balance:    <Money_Format amount=  {student?.account_bal}/>
                    </div>


                    {/* <div
                        className="text-slate-800 mt-5 mb-5 text-xl font-bold"
                    >
                        Total:   ₦  {total && devfee?.fee && (total + devfee?.fee)}
                    </div> */}
                </div>












                <div
                    className="grid grid-cols-2 space-x-5"
                >

                    <NavButton
                        title="Pay Now"
                        uLink="/student/checkout/payment/PayNow"
                    />


                    <NavButton
                        title="Pay On Delivery"
                        uLink="/student/checkout/confirmOrder"
                    />

                </div>








            </>
        </StuLayout>
    )
}




