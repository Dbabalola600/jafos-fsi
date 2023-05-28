import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import ErrMess from "../../../../components/shared/ErrMess";
import GoodMess from "../../../../components/shared/GoodMess";
import Header from "../../../../components/shared/Header";
import NavButton from "../../../../components/shared/NavButton";
import StaffLay from "../../Layout/StaffLay";








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


        // fetch dev fee amount
        const feeResponse = await fetch("/api/student/order/devfeeAmt", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as DevFee
        setDevfee(feeResponse)









        const response2 = await fetch("/api/staff/fetchStaff", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Staff


        setStaff(response2)


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


    //orderid
    const massId: string[] = []

    for (let i = 0; i < orders.length; i++) {
        massId.push(orders[i]._id)
    }

    // console.log(massId)











    return (
        <StaffLay>
            <>

                <Header
                    title="Payment"
                />
                <div
                    className="text-black text-xl"
                >

                    <div>
                        Amount Due:   ₦  {total}
                    </div>

                    <div>
                        Delivery Fee:   ₦  {devfee?.fee}
                    </div>

                    <div>
                        Available Balance:   ₦  {staff?.account_bal}
                    </div>
                </div>






                <div
                    className="grid grid-cols-2 space-x-5"
                >


                    <NavButton
                        title="Pay Now"
                        uLink="/staff/checkout/payment/PayNow"
                    />



                    <NavButton
                        title="Pay On Delivery"
                        uLink="/staff/checkout/confirmOrder"
                    />
                </div>











            </>
        </StaffLay>
    )
}