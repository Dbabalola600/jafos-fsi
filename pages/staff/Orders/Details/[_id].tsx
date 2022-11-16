import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Header from "../../../../components/shared/Header"
import StaffLay from "../../Layout/StaffLay"








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
        const token = getCookie("Staffuser")





        const body = {
            id: ssd._id,
        }




        const response = await fetch("/api/staff/order/fetchOrderItems", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as OrderItems[]


        setOrderItems(response)
        console.log(response)



    }
    useEffect(() => {
        showOrder()
    }, [])


    return (
        <StaffLay>
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
        </StaffLay>
    )



}







