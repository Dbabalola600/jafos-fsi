import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import StuLayout from "./Layout/StuLayout";

import { FormEventHandler, Key, useEffect, useState } from "react"
import { getCookie } from "cookies-next";
type Cart = {
    _id: string
    user: string
    title: string
    category: string
    price: number
}



function Cart() {
    const [carts, setCarts] = useState<Cart[]>([])



    const showCart = async () => {
        const user = getCookie("user")


        const body = {
            id: user
        }

        const response = await fetch("/api/student/fetchCart", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Cart[]


        setCarts(response)

    }


    useEffect(() => {
        showCart()
    }, [])



    return (
        <StuLayout>
            <>

                <div
                    className=" bg-black md:w-60">
                    <Header
                        title="CART"
                    />
                </div>
                {carts.map((cart: {
                    _id: Key | null | undefined;
                    title: string
                    price: number
                }) => (
                    <div
                        key={cart._id}
                    >

                        <Header
                            title={cart.title}
                            desc={cart.price}
                        />


                    </div>


                ))}


            </>
        </StuLayout>
    )
}

export default Cart;