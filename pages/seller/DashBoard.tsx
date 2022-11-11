import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import CatLayout from "./Layout/CatLayout";



type Seller = {
    _id: string
    storename: string;
    store_desc: string
    account_bal: number
    status: string
}




type OrderItems = {
    _doc: any
    _id: string;
    product: string;
    storename: string;
    price: number;
    quantity: number;
    amount: number;
    user: string;
    userObj: {
        firstname: string
        _id: string
    }
}



type SpecOrder = {
    _id: string;
    user: string;
    stores: string
    orderList: OrderItems
    orderNum: number
  
}

function DashBoard() {
    const router = useRouter()
    const [seller, setSeller] = useState<Seller | null>(null);

    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const [orderNum, setorderNum] = useState<number>()

    const [orders, setOrders] = useState<SpecOrder[]>([])
    const showinfo = async () => {

        const token = getCookie("Selluser")
        console.log(token)

        const body = {
            _id: token
        }

        const response = await fetch("/api/seller/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


        setSeller(response)

        console.log(response.storename)




        const body2 = {
            name: response.storename
        }




        const OrderResponse = await fetch("/api/seller/order/fetchOrder", { method: "POST", body: JSON.stringify(body2) })
            .then(res => res.json()) as OrderItems[]

        setOrderItems(OrderResponse)
        // console.log(OrderResponse[0]._doc._id)


        const body3 = {
            Sname: response.storename
        }




        const specOrder = await fetch("/api/seller/order/fetchSpecOrder", { method: "POST", body: JSON.stringify(body3) })
            .then(res => res.json()) as SpecOrder[]


        console.log(specOrder)
        setOrders(specOrder)

        // console.log(specOrder[0].stores)


        

    }

    useEffect(() => {
        showinfo()
    }, []
    )





    async function closeStat() {

        const token = getCookie("Selluser")
        console.log(token)

        const body = {
            id: token
        }



        const respone = await fetch("/api/seller/closedStat", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.reload()
                    console.log("Successful")
                }
            })

    }




    async function OpStat() {

        const token = getCookie("Selluser")
        console.log(token)

        const body = {
            id: token
        }



        const respone = await fetch("/api/seller/openStat", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.reload()
                    console.log("Successful")
                }
            })

    }








    return (
        <CatLayout>
            <>

                <div
                    className=" bg-black md:w-60">
                    <div className="text-primary text-3xl">
                        Welcome {seller?.storename} {" "}
                        {seller?.account_bal} Credits
                    </div>



                    <div>
                        {seller?.status}
                    </div>
                </div>





                <div
                    className="text-green-500 btn btn-primary"
                    onClick={OpStat}
                >
                    OPEN
                </div>

                <div
                    className="text-red-500 btn btn-primary"
                    onClick={closeStat}
                >
                    Closed
                </div>



                <div
                    className="text-2xl text-primary"
                >
                    Display orders
                </div>



                {orders.map((order: {
                    _id: string;
                    user: string
                    stores: string
                    orderNum: number
                }, index) => (
                    <div
                        key={order._id}
                    >



                        <Link
                            href={`/seller/Orders/Details/${order._id}`}
                        >
                            <a>
                                <Header
                                    title=   "order" 
                                    desc={order.orderNum}
                                />
                            </a>

                        </Link>

                    </div>
                ))}




                {/* {orderItems.map((orderItem: {
                    _doc: any;
                    _id: string;
                    storename: string
                    product: string
                    user: string
                    userObj: {
                        firstname: string
                        _id: string
                    }
                }) => (
                    <div
                        key={orderItem._id}
                    >
                        <Link
                            href={`/seller/Orders/Details/${orderItem._doc._id}`}
                        >
                            <a>
                                <Header
                                    title={orderItem._doc.product}
                                    desc={orderItem?.userObj?.firstname}
                                />
                            </a>

                        </Link>


                    </div>
                ))} */}


            </>
        </CatLayout>
    )
}

export default DashBoard;