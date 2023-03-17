import { getCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Header from "../../../components/shared/Header"
import StaffLay from "../Layout/StaffLay"











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

    const [orders, setOrders] = useState<SpecOrder[]>([])
    const router = useRouter()

    const showOrder = async () => {
        const token = getCookie("Staffuser")
        const body = {
            stu: token
        }


        const response = await fetch("/api/staff/order/fetchSpecOrder", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as SpecOrder[]


        setOrders(response)
        console.log(response)


    }
    useEffect(() => {
        showOrder()
    }, [])


    return (
        <StaffLay>
            <>
                <Header
                    title="Orders"
                    desc="Show recent orders i.e pending and what not"
                />


                <div>
                    click to show all orders i.e from the orders api
                </div>







                {orders.map((order: {
                    _id: string;
                    user: string
                    stores: string
                    orderNum: number
                }) => (
                    <div
                        key={order._id}
                    >



                        <Link
                            href={`Orders/Details/${order._id}`}
                        >
                            <a>
                                <Header
                                    title="order"
                                    desc={order.orderNum}
                                />
                            </a>

                        </Link>

                    </div>
                ))}

            </>
        </StaffLay>
    )



}

