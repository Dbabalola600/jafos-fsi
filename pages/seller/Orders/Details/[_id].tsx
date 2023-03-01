
import Header from "../../../../components/shared/Header";
import CatLayout from "../../Layout/CatLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import CusCollapse from "../../../../components/shared/CusCollapse";





type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
}


type Staff = {
    _id: string;
    firstname: string
    lastname: string
    staffid: string
}




type Seller = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
}





type OrderItems = {
    _doc: any
    oriOrder: {
        _id: string;
        product: string;
        storename: string;
        price: number;
        quantity: number;
        amount: number;
        orderNum: number;
        status: string;
        p_status: string;
        mod: string;
        user: string;
        createdAt: string
    }

    userObj: {
        firstname: string
        lastname: string

        _id: string
    }
}




type Order = {
    _id: string;
    user: string;
    stores: string
    orderList: OrderItems
    orderNum: number

}









export default function index() {
    const [student, setStudent] = useState<Student | null>(null);
    const [staff, setStaff] = useState<Staff| null>(null);
    const [seller, setSeller] = useState<Seller | null>(null);
    const [orderItems, setOrderItem] = useState<OrderItems[]>([])

    const [isLoading, setLoading] = useState(false)

    const [order, setOrder] = useState<Order[]>([])





    const router = useRouter()

    // let pth = router.asPath.split("/")



    let ssd = router.query


    // console.log(ssd._id)

    const token = getCookie("Selluser")
    // console.log(token)




    const showinfo = async () => {


        const body = {
            _id: token
        }

        const response = await fetch("/api/seller/fetchSeller", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Seller


        setSeller(response)
        // console.log(response.storename)



        const body2 = {
            id: ssd._id,
            Sname: response.storename

        }

        const Ordresponse = await fetch("/api/seller/order/fetchOrderItems", { method: "POST", body: JSON.stringify(body2) })
            .then(res => res.json()) as OrderItems[]



        console.log(Ordresponse)

        setOrderItem(Ordresponse)




        const body3 = {
            id: ssd._id
        }



        const order = await fetch("/api/seller/order/fetchOrder", { method: "POST", body: JSON.stringify(body3) })
            .then(res => res.json()) as Order


        const body4 = {
            id: order.user
        }



        const UserResponse = await fetch("/api/seller/fetchStudent", { method: "POST", body: JSON.stringify(body4) })
            .then(res => res.json()) as Student

        if (UserResponse === null) {
            const UserResponse = await fetch("/api/seller/fetchStaff", { method: "POST", body: JSON.stringify(body4) })
            .then(res => res.json()) as Staff

            setStaff(UserResponse)

        } else {
            console.log(UserResponse)
            setStudent(UserResponse)
        }






    }






    useEffect(() => {
        showinfo()

    }, [])



    //change status to complete

    async function CompleteStat(id: any) {
        setLoading(true)



        const body = {
            id: id
        }

        const StatResponse = await fetch("/api/seller/order/compOrderStat", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/seller/Orders")
                }
            })

        setLoading(false)

    }





    //change status to deliverd


    async function DeliveredStat(id: any) {
        setLoading(true)



        const body = {
            id: id
        }

        const StatResponse = await fetch("/api/seller/order/deliOrderStat", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    router.push("/seller/Orders")
                }
            })

        setLoading(false)

    }


    //change status to cancelled

    const CancelStat = async (id: any,
        rec_id: any,
        stat: string,
        amt: any,
        sen_id: any
    ) => {

        setLoading(true)


        //order id 
        const body = {
            id: id
        }





        const body2 = {
            sen: sen_id,
            amt: amt,
            rec: rec_id,
            stat: stat
        }


        // change status to cancelled
        const StatResponse = await fetch("/api/seller/order/cancelOrderStat", { method: "POST", body: JSON.stringify(body) })
            .then(async res => {
                if (res.status == 200) {
                    //refund the order
                    const refund = await fetch("/api/seller/order/refund", { method: "POST", body: JSON.stringify(body2) })
                    router.push("/seller/Orders")
                }



                if (res.status == 401) {
                    console.log("ERROR")
                }
            })
            .catch(err => {
                console.log(err)
            })
        setLoading(false)

    }



    return (
        <CatLayout>
            <>

                <Header
                    title="this a an order thingy"
                desc={student?.firstname || staff?.firstname}
                />












                {orderItems.map((orderItem: {
                    oriOrder: {
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

                    userObj: {
                        firstname: string
                        _id: string
                        lastname: string

                    }
                }) => (
                    <div
                        key={orderItem.oriOrder._id}
                    >
                        <div
                            className="text-red-500"
                        >
                            {orderItem.oriOrder.product} {" "} {orderItem.oriOrder.orderNum} {" "} {orderItem.userObj.firstname}
                            <p>
                                {orderItem.oriOrder.status}
                            </p>

                        </div>
                    </div>
                ))}





                {/* completed order button */}
                <div
                    className="btn btn-primary"
                    onClick={() => {
                        orderItems.map((orderItem: {
                            oriOrder: {
                                _id: string;
                            }


                        }) => {
                            CompleteStat(orderItem.oriOrder._id)
                        })
                    }}

                >
                    {isLoading ? "Loading..." : "Completed"}
                </div>


                {/* delivered order button */}
                <div

                    className="btn btn-primary"
                    onClick={() => {
                        orderItems.map((orderItem: {
                            oriOrder: {
                                _id: string;
                            }
                        }) => {
                            DeliveredStat(orderItem.oriOrder._id)
                        })
                    }}

                >
                    {isLoading ? "Loading..." : "Delivered"}
                </div>




                {/* for cancel and refund */}
                <div
                    className="btn btn-primary"
                    onClick={() => {
                        orderItems.map((orderItem: {
                            oriOrder: {
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

                            userObj: {
                                firstname: string
                                _id: string
                                lastname: string

                            }
                        }) => {
                            CancelStat(orderItem.oriOrder._id,
                                orderItem.userObj._id,
                                orderItem.oriOrder.status,
                                orderItem.oriOrder.amount,
                                orderItem.oriOrder.storename)
                        })
                    }}

                >
                    {isLoading ? "Loading..." : "Cancel Order"}
                </div>

            </>
        </CatLayout>
    )
}