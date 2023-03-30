
import Header from "../../components/shared/Header";

import StuLayout from "./Layout/StuLayout";


import { FormEventHandler, useEffect, useState } from "react"

import CartInput from "../../components/shared/CartInput";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import GoodMess from "../../components/shared/GoodMess";




type Cart = {
    _id: string
    user: string
    title: string
    category: string
    price: number
    storename: string
}
type Student = {
    _id: string;
    firstname: string
    lastname: string
    matricno: string
}


export type cartListType = {
    _id: string;
    amount: number;
    price: number;
    quantity: number;
    title: string;
    storename: string;
    product: string
    total?: number
}[]








export default function Cart() {
    const router = useRouter()
    const [carts, setCarts] = useState<Cart[]>([])
    const [student, setStudent] = useState<Student | null>(null);
    const [isLoading, setLoading] = useState(false)

    const [cartList, setCartList] = useState<cartListType>([]);

    const [showgoodtoast, setgoodtoast] = useState({ message: "", show: false })

    useEffect(() => {
        if (showgoodtoast.show) {
            setTimeout(() => {
                setgoodtoast({ message: "", show: false })
            }, 5000)
        }

    }, [showgoodtoast.show])

    // fetch cart
    const showCart = async () => {
        const user = getCookie("Normuser")
        const body = {
            id: user
        }

        const response = await fetch("/api/student/cart/fetchCart", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Cart[]

        // console.log({ response })
        setCarts(response)



    }


    //delete one item
    const delOne = async (_id: any) => {


        const body = {
            id: _id
        }
        console.log(_id)

        const reponse = await fetch("/api/student/cart/deleteFromCart", { method: "POST", body: JSON.stringify(body) })
            .then(res => {
                if (res.status == 200) {
                    setgoodtoast({ message: " message", show: true })

                    router.reload()
                    console.log("DELETED")
                }
            })

    }


    useEffect(() => {
        showCart()
    }, [])

    // add item to order

    const addCheckoutItem: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const user = getCookie("Normuser")

        setLoading(true)
        console.log(user)

        const form = e.currentTarget.elements as any


        const body = {
            user: user,
            cartList

        }



        const body2 = {
            user: user
        }

        const response = await fetch("/api/student/order/newCheckOutItem", { method: "Post", body: JSON.stringify(body) })
            .then(async res => {
                console.log(res.status)

                if (res.status == 200) {

                    //delete entire cart
                    const del = await fetch("/api/student/cart/deleteCart", { method: "POST", body: JSON.stringify(body2) })
                        .then(res => {
                            if (res.status == 200) {
                                router.push("/student/checkout/")
                                console.log("SUCCESS")
                            }
                        })
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

        <StuLayout>
            <>
                <div
                    className="">
                    <Header
                        title="CART"
                    />
                </div>

                {showgoodtoast.show && <GoodMess title="Deleted Sucessfully" />}





                <form
                    onSubmit={
                        addCheckoutItem
                    }
                >
                    <div

                        className="grid grid-cols-2 lg:grid-cols-2 mt-10 gap-6 "

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
                                    cartList={cartList}
                                    setCartList={setCartList}
                                    product={cart.title}
                                    storename={cart.storename}
                                    price={cart.price}
                                    index={index}
                                    clickButton={() => delOne(cart._id)}

                                />

                            </div>




                        ))}

                    </div>


                    <button
                        className="btn btn-primary w-full mt-10 col-span-2"
                        onClick={() => addCheckoutItem}
                        type="submit"
                    >
                        {isLoading ? "Loading..." : "PROCEED TO CHECKOUT"}
                    </button>




                </form>



            </>

        </StuLayout >
    )




}







