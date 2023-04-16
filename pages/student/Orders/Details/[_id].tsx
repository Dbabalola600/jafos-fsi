import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../../components/shared/Header";
import StuLayout from "../../Layout/StuLayout";


type Orders = {
    _id: string
    user: string
    product: string
    storename: string
    price: number
    quantity: number
    amount: number
    status: string
}



type OrderItems = {
    _doc: any
    _id: string;
    product: string;
    storename: string;
    price: number;
    quantity: number;
    orderNum: number
    status: string;
    p_status: string;
    mod: string;
    amount: number;
    user: string;
    userObj: {
        firstname: string
        lastname: string
        matricno: string
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



export default function Index() {

    const [orderItems, setOrderItems] = useState<OrderItems[]>([])
    const router = useRouter()
    const [total, setTotal] = useState<number | null>(0)







    let ssd = router.query

    const showOrder = async () => {
        const token = getCookie("Normuser")





        const body = {
            id: ssd._id,
        }




        const response = await fetch("/api/student/order/fetchOrderItems", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as OrderItems[]



        let tot = 0

        for (let i = 0; i < response.length.valueOf(); i++) {
            tot += response[i].amount
            setTotal(tot)
        }


        setOrderItems(response)
        console.log(response)



    }
    useEffect(() => {
        showOrder()
    }, [])


    return (
        <StuLayout>
            <>
                <Header
                    title={"Order Number: " + orderItems[0]?.orderNum}

                />




                <div
                    className="mb-5 mt-5 text-primary"
                >

                  
                    <div>
                        Devliery Information: {orderItems[0]?.mod}
                    </div>
                    <div>
                        Amount Due: NGN {total}
                    </div>
                </div>

                <div
                    className="underline text-primary text-xl"
                >
                    Order details
                </div>

                <div
                    className="text-black space-x-4 lg:text-lg  text-[10px] mt-2 grid grid-cols-6 border-solid border-black break-words"

                >

                    <div
                        className="bg-"
                    >
                        Quantity
                    </div>

                    <div
                        className="bg-"
                    >
                        Product
                    </div>
                    <div>
                        Price
                    </div>
                    <div>
                        Store
                    </div>
                    <div>
                        Order Status
                    </div>

                    <div>
                        Payment Info
                    </div>
                </div>

                <hr
                className="w-full bg-primary "
                />
                {orderItems.map((orderItem: {
                    _doc: any;
                    _id: string;
                    storename: string
                    product: string
                    orderNum: number
                    user: string
                    price: number;
                    status: string;
                    p_status: string;
                    mod: string;
                    quantity: number;
                    amount: number;
                    userObj: {
                        firstname: string
                        _id: string
                        lastname: string
                        matricno: string
                    }
                }) => (
                    <div
                        key={orderItem._id}
                    >

                        <div
                            className="text-black space-x-4 lg:text-lg  text-[10px] mt-2 grid grid-cols-6  border-solid border-black break-words"
                        >
                            <div
                                className="col-span-1"
                            >
                                {orderItem.quantity}
                            </div>


                            <div

                                className="col-span-1">
                                {orderItem.product}
                            </div>

                            <div
                                className="col-span-1"
                            >
                                {orderItem.amount}

                            </div>

                            <div
                                className="col-span-1"
                            >
                                {orderItem.storename}
                            </div>

                            <div
                                className="col-span-1"
                            >
                                {orderItem.status}
                            </div>
                            <div
                                className="col-span-1"
                            >
                                {orderItem.p_status}
                            </div>

                        </div>

                    </div>
                ))}








            </>
        </StuLayout>
    )



}




















{/* {orders.map((order: {
                    _id: string | null
                    user: string
                    product: string
                    storename: string
                    price: number
                    quantity: number
                    amount: number
                    status: string
                }) =>
                    <div
                        key={order._id}
                    >


                        <div
                            className="text-red-500"
                        >
                            {order.status}  {"  "}  {order.quantity} {"  "}  {order.product}
                        </div>





                    </div>
                )} */}
