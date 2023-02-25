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



export default function payPortal() {
    const [student, setStudent] = useState<Student | null>(null);
    const [orders, setOrders] = useState<Orders[]>([])
    const [total, setTotal] = useState<number | null>()
    const [devfee, setDevfee] = useState<number | null>()
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


        // let tot = response[0].amount + response[1].amount


        let l_tot = response.length.valueOf()
        let sum = 0



        let dev = 50

        console.log(response[0].mod)

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
            setTotal(sum + dev)
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
   




   


  
    return (
        <StuLayout>
            <>

                <Header
                    title="payment portal "
                />
                <div
                    className="text-red-500"
                >

                    <div>
                        amount due: {total}
                    </div>

                    <div>
                        Delivery Fee: {devfee}
                    </div>

                    <div>
                        available balance: {student?.account_bal}
                    </div>
                </div>


               

               


                


                



                <NavButton
                    title="Pay Now"
                    uLink="/student/checkout/payment/PayNow"
                />


                <NavButton
                    title="Pay On Delivery"
                    uLink="/student/checkout/confirmOrder"
                />







            </>
        </StuLayout>
    )
}




