import DefaultLayout from "../../components/layouts/DefaultLayout";
import Header from "../../components/shared/Header";

import StuLayout from "./Layout/StuLayout";


import { FormEventHandler, Key, useEffect, useState } from "react"

import CartInput from "../../components/shared/CartInput";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";




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


    const showinfo = async () => {


        const token = getCookie("Normuser")
        const body = {
            _id: token
        }

        const response = await fetch("/api/student/fetchStudent", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Student



        setStudent(response)



        console.log(response)

    }





    // fetch cart
    const showCart = async () => {
        const user = getCookie("Normuser")
        const body = {
            id: user
        }

        const response = await fetch("/api/student/cart/fetchCart", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Cart[]

        console.log({ response })
        setCarts(response)



    }



    const delOne = async (id: any) => {


        const reponse = await fetch("/api/student/cart/deleteFromCart", { method: "POST", body: JSON.stringify(id) })
            .then(res => {
                if (res.status == 200) {
                    router.reload()
                    console.log("DELETED")
                }
            })

    }


    useEffect(() => {
        showCart()
    }, [])

    useEffect(() => {
        showinfo()

    }, [])


    // add item to order

    const addOrderItem: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const user = getCookie("Normuser")

        setLoading(true)
        console.log(user)

        const form = e.currentTarget.elements as any


        const body = {
            user: user,
            cartList

        }


        const response = await fetch("/api/student/order/newOrderItem", { method: "Post", body: JSON.stringify(body) })
            .then(async res => {
                console.log(res.status)

                if (res.status == 200) {

                    //delete entire cart
                    const del = await fetch("/api/student/cart/deleteCart", { method: "POST", body: JSON.stringify(user) })
                        .then(res => {
                            if (res.status == 200) {
                                router.push("/student/DashBoard/")
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






   


    // console.log(cartList[0].total)

    // let grande = cartList[0].total
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
                        addOrderItem
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
                                cartList={cartList}
                                setCartList={setCartList}
                                product={cart.title}
                                storename={cart.storename}
                                price={cart.price}
                                index={index}
                                clickButton={()=> delOne(cart._id)}

                            />

                        </div>



                    ))}


                    <button
                        className="btn btn-primary w-full mt-10"
                        onClick={() => addOrderItem}
                        type="submit"
                    >
                        {isLoading ? "Loading..." : "SUBMIT"}
                    </button>
                </form>


            </>

        </StuLayout>
    )




}







