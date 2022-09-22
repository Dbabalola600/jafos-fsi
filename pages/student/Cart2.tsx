import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import StuLayout from "./Layout/StuLayout";

import { FormEventHandler, Key, useEffect, useState } from "react"
import { getCookie } from "cookies-next";
import CartInput from "../../components/shared/CartInput2";
import { useRouter } from "next/router";
type Cart = {
    _id: string
    user: string
    title: string
    category: string
    price: number
    storename: string
}

export type cartListType = {
    _id: string;
    amount: number;
    price: number;
    quantity: number;
    title: string;
    storename: string;
   
}[]



type Order = {
    user: string;
    orderList: String;
}

function Cart() {
    const router = useRouter()
    const [carts, setCarts] = useState<Cart[]>([])

    const [cartList, setCartList] = useState<cartListType>([]);



    const showCart = async () => {
        const user = getCookie("user")
        const body = {
            id: user
        }

        const response = await fetch("/api/student/fetchCart", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Cart[]

        console.log({ response })
        setCarts(response)



    }


    useEffect(() => {
        showCart()
    }, [])


    const addOrder: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const user = getCookie("user")
        console.log(user)
        const form = e.currentTarget.elements as any

        const body = {
            user: user,
            orderList: cartList
        }
        const response = await fetch("/api/student/order/newOrder", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                console.log(res.status)
                if (res.status == 200) {
                    router.push("/student/DashBoard/")
                } if (res.status == 401) {
                    console.log("ERROR")
                }
            })
            .catch(err => {
                console.log(err)
            }) 


    }
    useEffect(()=>{
        console.log(cartList)
    },[
        cartList
    ])


    return (
        <StuLayout>
            <>

                <div
                    className=" bg-black md:w-60">
                    <Header
                        title="CART"
                    />
                </div>

                <form
                    onSubmit={
                        addOrder
                    }
                >
                    {carts.map((cart: {
                        _id: string | null | undefined;
                        title: string
                        price: number
                        storename: string
                    }, index) => (
                        <div
                            key={cart._id}
                        >



                            <CartInput
                                id={cart._id || ""}
                                index = {index}
                                product={cart.title}
                                price={cart.price}
                                cartList={cartList}
                                setCartList={setCartList}
                                storename={cart.storename}
                            />





                        </div>


                    ))}


                    <button
                        className="btn btn-primary w-full"
                        onClick={() => addOrder}
                        type="submit"
                    >
                        SUBMIT
                    </button>
                </form>

            </>
        </StuLayout>
    )
}

export default Cart;