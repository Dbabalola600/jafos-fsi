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



export default function index() {

    const [orderItems, setOrderItems] = useState<OrderItems[]>([])
    const router = useRouter()






    let ssd = router.query

    const showOrder = async () => {
        const token = getCookie("Normuser")





        const body = {
            id: ssd._id,
        }




        const response = await fetch("/api/student/order/fetchOrderItems", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as OrderItems[]


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
                    title="Orders Details"
                    desc="Show recent orders i.e pending and what not"
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
                            className="text-green-500"
                        >
                            {orderItem.product}  {" "}

                            {orderItem.status}

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
