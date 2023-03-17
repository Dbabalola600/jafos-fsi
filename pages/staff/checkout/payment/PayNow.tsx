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



export default function PayPortal() {
    const [staff, setStaff] = useState<Staff | null>(null);
    const [orders, setOrders] = useState<Orders[]>([])
    const [total, setTotal] = useState<number | null>()
    const [devfee, setDevfee] = useState<number | null>()
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
            devf: devfee


        }



        const reponse = await fetch("/api/staff/transactions/checkPay", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    setgoodtoast({ message: " message", show: true })

                    router.push("/staff/checkout/confirmOrder")
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
        const body={
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
                        available balance: {staff?.account_bal}
                    </div>
                </div>




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


                        <div
                            className="text-red-500 mt-10"
                        >
                            Order Status: {order.status}  {"  "} Product name:  {order.product} {" "} ,Price:{order.price}
                            <p>
                                Paymneent Status:  {order.p_status} {" "}  ,Method of Delivery:{order.mod}
                            </p>




                        </div>


                        <button className="w-full btn-primary btn "
                            onClick={() => delOne(order._id)}
                        >
                            Delete Item

                        </button>



                        {/* <button className="w-full btn-primary btn "
                                onClick={() => Pay2(order.amount, order._id)}>
                                {isLoading ? "Loading..." : "Pay"}

                            </button> */}








                    </div>
                )}



                <button className="w-full btn-primary btn mt-5 "
                    onClick={() => {
                        orders.map((order: any) => {
                            Pay2(order.amount, order._id)
                        }
                        )
                    }}>
                    {isLoading ? "Loading..." : "Pay"}

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