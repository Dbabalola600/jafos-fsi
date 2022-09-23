import { getCookie } from "cookies-next";
import Link from "next/link";
import { Key, useEffect, useState } from "react";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import CatLayout from "./Layout/CatLayout";



type Seller = {
    _id: string
    storename: string;
    firstname: string
    lastname: string
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

function DashBoard() {

    const [seller, setSeller] = useState<Seller | null>(null);

    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);

    const showinfo = async () => {

        const token = getCookie("user")
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
        console.log(OrderResponse[0])

    }

    useEffect(() => {
        showinfo()
    }, []
    )









    return (
        <CatLayout>
            <>

                <div
                    className=" bg-black md:w-60">
                    <div className="text-primary text-3xl">
                        Welcome {seller?.storename}
                    </div>

                </div>

                <div
                    className="text-2xl text-primary"
                >
                    Display orders
                </div>








                {orderItems.map((orderItem: {
                    _doc: any;
                    _id: Key | null | undefined;
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
                            href={`/seller/Orders/Details/${orderItem.userObj._id}`}
                        >
                            <a>
                            <Header
                                title={orderItem._doc.product}
                                desc={orderItem?.userObj?.firstname}
                            />
                            </a>
                           
                        </Link>


                    </div>
                ))}


            </>
        </CatLayout>
    )
}

export default DashBoard;