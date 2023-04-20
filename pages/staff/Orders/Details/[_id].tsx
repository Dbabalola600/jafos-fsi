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
    fee: number
   l_order:{
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
   }
    
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
        const token = getCookie("Staffuser")





        const body = {
            id: ssd._id,
        }




        const response = await fetch("/api/staff/order/fetchOrderItems", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as OrderItems[]
            let tot = 0

            for (let i = 0; i < response.length.valueOf(); i++) {
                tot += response[i].l_order.amount
                setTotal(tot)
            }

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
                    title={"Order Number: " + orderItems[0]?.l_order.orderNum}

                />




                <div
                    className="mb-5 mt-5 text-primary"
                >

                  
                    <div>
                        Devliery Information: {orderItems[0]?.l_order.mod}
                    </div>
                    <div>
                        Amount Due: NGN {total}
                    </div>



                    <div>
                        Delivery Fee per Store : NGN {orderItems[0]?.fee}
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
                   fee: number
                   l_order:{
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
                   }
                    
                    userObj: {
                        firstname: string
                        lastname: string
                        matricno: string
                        _id: string
                    }
                }) => (
                    <div
                        key={orderItem.l_order._id}
                    >

                        <div
                            className="text-black space-x-4 lg:text-lg  text-[10px] mt-2 grid grid-cols-6  border-solid border-black break-words"
                        >
                            <div
                                className="col-span-1"
                            >
                                {orderItem.l_order.quantity}
                            </div>


                            <div

                                className="col-span-1">
                                {orderItem.l_order.product}
                            </div>

                            <div
                                className="col-span-1"
                            >
                                NGN {orderItem.l_order.price}

                            </div>

                            <div
                                className="col-span-1"
                            >
                                {orderItem.l_order.storename}
                            </div>

                            <div
                                className="col-span-1"
                            >
                                {orderItem.l_order.status}
                            </div>
                            <div
                                className="col-span-1"
                            >
                                {orderItem.l_order.p_status}
                            </div>

                        </div>

                    </div>
                ))}








            </>
        </StaffLay>
    )



}







