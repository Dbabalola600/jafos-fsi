import { FormEventHandler, useEffect, useState } from "react"


import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import CartInput from "../../components/shared/CartInput";
import Header from "../../components/shared/Header";
import StaffLay from "./Layout/StaffLay";
import GoodMess from "../../components/shared/GoodMess";




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
    product: string
    total?: number
}[]



type Staff = {
    _id: string;
    firstname: string
    lastname: string
    staffid: string
    account_bal: number
}








export default function Cart() {
    const router = useRouter()
    const [carts, setCarts] = useState<Cart[]>([])
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
        const user = getCookie("Staffuser")
        const body = {
            id: user
        }

        const response = await fetch("/api/staff/cart/fetchCart", { method: "POST", body: JSON.stringify(body) })
            .then(res => res.json()) as Cart[]

        // console.log({ response })
        setCarts(response)
    }


    //delete one item
    const delOne = async (_id: any) => {


        const body = {
            id: _id
        }

        const reponse = await fetch("/api/staff/cart/deleteFromCart", { method: "POST", body: JSON.stringify(body) })
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

    const addCheckOutItem: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const user = getCookie("Staffuser")

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


        const response = await fetch("/api/staff/order/newCheckOutItem", { method: "Post", body: JSON.stringify(body) })
            .then(async res => {
                console.log(res.status)

                if (res.status == 200) {

                    //delete entire cart
                    const del = await fetch("/api/staff/cart/deleteCart", { method: "POST", body: JSON.stringify(body2) })
                        .then(res => {
                            if (res.status == 200) {
                                router.push("/staff/checkout/")
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

        <StaffLay>
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
                        addCheckOutItem
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
                        className="btn btn-primary w-full mt-10"
                        onClick={() => addCheckOutItem}
                        type="submit"
                    >
                        {isLoading ? "Loading..." : "PROCEED TO CHECKOUT"}
                    </button>
                </form>


            </>

        </StaffLay>
    )




}







