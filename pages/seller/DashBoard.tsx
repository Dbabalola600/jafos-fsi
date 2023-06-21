import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import CatLayout from "./Layout/CatLayout";
import OrderCard from "../../components/shared/OrderCard";

import EmptyOrder from "../../components/shared/Empty States/EmptyOrder";

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
        lastname: string
    }
}



type Order = {

    userObj: {
        firstname: string
        _id: string
        lastname: string
    }

    orderObj: {
        "0": {
            _id: string;
            storename: string
            product: string
            orderNum: number
            user: string
            price: number;
            quantity: number;
            amount: number;
            status: string
        }
    }

    oriOrder: {
        stores: string
        orderList: OrderItems
        orderNum: number
        user: string
        _id: string

    }
}

function DashBoard() {
    const router = useRouter()
    const [seller, setSeller] = useState<Seller | null>(null);



    const [orders, setOrders] = useState<Order[]>([])
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




        const body3 = {
            Sname: response.storename
        }




        const specOrder = await fetch("/api/seller/order/fetchNewOrder", { method: "POST", body: JSON.stringify(body3) })
            .then(res => res.json()) as Order[]



        setOrders(specOrder)





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
                    // router.push("/seller/DashBoard")
                    router.reload()
                    console.log("Successful")
                }
            })

    }






    console.log(orders[0])

    if (orders[0]?.oriOrder._id === undefined) {
        return (
            <CatLayout>
                <>



                    <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-6">


                        <div className="grid grid-cols-2 lg:grid-cols-1 text-primary rounded-lg  lg:text-3xl  text-lg">

                            <div>

                                Welcome {seller?.storename}{"  "}
                                <p>
                                    Currently: {seller?.status}
                                </p>
                            </div>

                            <div
                                className="grid grid-cols-2 lg:grid-cols-2 lg:mt-2 gap-6"

                            // className=" grid grid-cols-2 space-y-5 lg:mt-1 space-x-5 bg-red-500"
                            >
                                <div
                                    className="text-green-500 btn btn-primary "
                                    onClick={OpStat}
                                >
                                    OPEN
                                </div>

                                <div
                                    className="text-red-500 btn btn-primary "
                                    onClick={closeStat}
                                >
                                    Closed
                                </div>
                            </div>


                        </div>



                        <div className="bg-primary rounded-lg  p-3">


                            <div className="flex items-end space-x-3">

                                <div className=" relative   ">


                                    <div className="text-black   font-bold  text-xl">
                                        Available Balance
                                    </div>

                                    <p
                                        className="text-gray-400"
                                    >
                                        ₦  {seller?.account_bal}
                                    </p>
                                </div>
                            </div>

                            <div
                                className="pt-2 float-right w-1/2 hover:cursor-pointer "
                            >

                                <Link
                                    href="/seller/Products/newProduct"
                                >
                                    <div
                                        className="rounded-xl text-center text-sm  bg-black text-white "
                                    >
                                        Add new product
                                    </div>

                                </Link>


                            </div>
                        </div>

                    </div>



                    <div
                        className=" text-center text-primary  text-2xl font-bold mt-10 "

                    >
                        <a
                            className="text-center hover:underline hover:cursor-pointer"
                            onClick={() => router.push("/seller/Orders")}
                        >
                            Orders
                        </a>




                    </div>


                   <EmptyOrder/>





                </>
            </CatLayout>
        )
    } else {



        return (
            <CatLayout>
                <>



                    <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-6">


                        <div className="grid grid-cols-2 lg:grid-cols-1 text-primary rounded-lg  lg:text-3xl  text-lg">

                            <div>

                                Welcome {seller?.storename}{"  "}
                                <p>
                                    Currently: {seller?.status}
                                </p>
                            </div>

                            <div
                                className="grid grid-cols-2 lg:grid-cols-2 lg:mt-2 gap-6"

                            // className=" grid grid-cols-2 space-y-5 lg:mt-1 space-x-5 bg-red-500"
                            >
                                <div
                                    className="text-green-500 btn btn-primary"
                                    onClick={OpStat}
                                >
                                    OPEN
                                </div>

                                <div
                                    className="text-red-500 btn btn-primary "
                                    onClick={closeStat}
                                >
                                    Closed
                                </div>
                            </div>


                        </div>



                        <div className="bg-primary rounded-lg  p-3">


                            <div className="flex items-end space-x-3">

                                <div className=" relative   ">


                                    <div className="text-black   font-bold  text-xl">
                                        Available Balance
                                    </div>

                                    <p
                                        className="text-gray-400"
                                    >
                                        ₦  {seller?.account_bal}
                                    </p>
                                </div>
                            </div>

                            <div
                                className="pt-2 float-right w-1/2 hover:cursor-pointer "
                            >

                                <Link
                                    href="/seller/Products/newProduct"
                                >
                                    <div
                                        className="rounded-xl text-center text-sm  bg-black text-white "
                                    >
                                        Add new product
                                    </div>

                                </Link>


                            </div>
                        </div>

                    </div>



                    <div
                        className=" text-center text-primary  text-2xl font-bold mt-10 "

                    >
                        <a
                            className="text-center hover:underline hover:cursor-pointer"
                            onClick={() => router.push("/seller/Orders")}
                        >
                            Orders
                        </a>

                    </div>



                    <div className="grid grid-cols-2 lg:grid-cols-2 mt- gap-6">

                        {orders.map((order: {
                            userObj: {
                                firstname: string
                                _id: string
                                lastname: string
                            }

                            orderObj: {
                                "0": {
                                    _id: string;
                                    storename: string
                                    product: string
                                    orderNum: number
                                    user: string
                                    price: number;
                                    quantity: number;
                                    amount: number;
                                    status: string
                                }
                            }

                            oriOrder: {
                                stores: string
                                orderList: OrderItems
                                orderNum: number
                                user: string
                                _id: string

                            }
                        }, index) => (
                            <div
                                key={order.oriOrder._id}
                            >

                                <div className="grid mt-5 ">
                                    <OrderCard
                                        OrderNum={order.oriOrder.orderNum}
                                        User={order.userObj.firstname + order.userObj.lastname}
                                        status={order.orderObj[0].status}
                                        ulink={`Orders/Details/${order.oriOrder._id}`}



                                    />



                                </div>

                            </div>
                        ))}
                    </div>






                </>
            </CatLayout>
        )
    }
}

export default DashBoard;